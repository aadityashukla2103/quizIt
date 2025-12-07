# frozen_string_literal: true

class Api::V1::QuizzesController < Api::V1::BaseController
  before_action :ensure_current_user_is_admin!, only: [:create, :update, :destroy]
  before_action :set_quiz, only: [:show, :update, :destroy]

  def index
    if @current_user
      quizzes = Quiz.includes(:category, :submissions)
        .where(organization_id: @current_user.organization_id)
    else
      quizzes = Quiz.includes(:category, :submissions)
        .where(status: "published")
    end

    if params[:query].present?
      search_term = "%#{params[:query].strip}%"
      quizzes = quizzes.where("quizzes.name ILIKE ?", search_term)
    end

    if params[:category].present? && params[:category].downcase != "all"
      category = Category.find_by("LOWER(name) = ?", params[:category].downcase)
      quizzes = quizzes.where(category_id: category.id) if category
    end

    allowed_statuses = %w[draft published]
    if @current_user && params[:status].present? && allowed_statuses.include?(params[:status])
      quizzes = quizzes.where(status: params[:status])
    end

    total_count = quizzes.count
    total_published_count = Quiz.where(status: "published").count
    total_draft_count = @current_user ? Quiz.where(
      organization_id: @current_user.organization_id,
      status: "draft").count : 0

    page = params[:page].to_i > 0 ? params[:page].to_i : 1
    page_size = params[:pageSize].to_i > 0 ? params[:pageSize].to_i : 10

    quizzes = quizzes.order(created_at: :desc)
      .offset((page - 1) * page_size)
      .limit(page_size)

    quizzes_data = quizzes.map do |quiz|
      quiz.as_json.merge(
        category_name: quiz.category&.name,
        submission_count: quiz.submissions.size,
        question_count: quiz.questions.count,
        organization_name: quiz.organization.name
      )
    end

    title =
      case params[:status]
      when "published" then "Published Quizzes"
      when "draft" then "Draft Quizzes"
      else "All Quizzes"
      end

    render json: {
      quizzes: quizzes_data,
      totalCount: total_count,
      total_published_quiz_count: total_published_count,
      total_draft_quiz_count: total_draft_count,
      page: page,
      pageSize: page_size,
      title: title
    }
  end

  def show
    @quiz = Quiz.includes(questions: :options).find(params[:id])

    latest_time = [
      @quiz.updated_at,
      @quiz.questions.maximum(:updated_at),
      Option.where(question_id: @quiz.question_ids).maximum(:updated_at)
    ].compact.max

    latest_time_ist = latest_time.in_time_zone("Asia/Kolkata")
    last_saved_at =
      if latest_time > @quiz.created_at
        latest_time_ist.strftime("%I:%M%p, %d %B %Y")
      else
        nil
      end

    render json: {
      quiz: @quiz.as_json,
      questions: @quiz.questions.as_json(include: :options),
      last_saved_at: last_saved_at
    }
end

  def create
    quiz = Quiz.new(quiz_params)
    quiz.organization_id = @current_user.organization_id
    quiz.status = "draft"

    if quiz.save
      render_json(quiz, :created)
    else
      render json: { errors: quiz.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    safe_params = quiz_params

    if @quiz.update(safe_params)
      render_json(@quiz)
    else
      render json: { errors: @quiz.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @quiz.destroy
    head :no_content
  end

  def clone
    original_quiz = Quiz.find(params[:id])
    cloned_quiz = original_quiz.clone_with_questions!

    render json: {
      id: cloned_quiz.id,
      name: cloned_quiz.name,
      status: cloned_quiz.status,
      category_name: cloned_quiz.category&.name,
      created_at: cloned_quiz.created_at,
      submission_count: 0
    }, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
 end

  def bulk_update
    data = bulk_params

    quiz_ids = data[:ids]
    updates = data[:updates].to_h

    if updates.blank?
      return render json: { error: "No fields to update" }, status: :bad_request
    end

    Quiz.where(id: quiz_ids).update_all(updates)

    render json: { message: "Quizzes updated" }
  end

  def bulk_delete
    quiz_ids = bulk_params[:ids]

    if quiz_ids.blank?
      return render json: { error: "No quizzes selected" }, status: :bad_request
    end

    Quiz.where(id: quiz_ids).destroy_all

    render json: { message: "Quizzes deleted successfully" }
end

  private

    def set_quiz
      @quiz = Quiz.find(params[:id])
    end

    def quiz_params
      params.require(:quiz).permit(:name, :category_id, :status)
    end

    def bulk_params
      params.require(:quiz).permit(
        ids: [],
        updates: {})
    end

    def ensure_current_user_is_admin!
      user_email = request.headers["X-Auth-Email"].presence
      @current_user = user_email && User.find_by(email: user_email)

      unless @current_user&.admin?
        render_error("Unauthorized Access!", :forbidden)
        nil
      end
    end
end
