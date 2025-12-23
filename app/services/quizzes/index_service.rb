# frozen_string_literal: true

class Quizzes::IndexService
  def initialize(current_user, params)
    @current_user = current_user
    @params = params
  end

  def call
    quizzes = base_scope
    quizzes = search(quizzes)
    quizzes = filter_category(quizzes)
    quizzes = filter_status(quizzes)

    total_count = quizzes.count
    total_published = Quiz.where(status: "published").count
    total_draft = draft_count

    quizzes = paginate(quizzes)

    {
      message: "",
      status: :ok,
      data: {
        quizzes: quizzes.map { |q| serialize(q) },
        totalCount: total_count,
        total_published_quiz_count: total_published,
        total_draft_quiz_count: total_draft,
        page: page,
        pageSize: page_size,
        title: title
      }
    }
  end

  private

    def base_scope
      quizzes = Quiz.includes(:category, :organization, :questions, :submissions)

      if @params[:organization_slug].present?
        organization = Organization.find_by(slug: @params[:organization_slug])
        quizzes = quizzes.where(organization_id: organization.id) if organization
      elsif @current_user
        quizzes = quizzes.where(organization_id: @current_user.organization_id)
      end

      if @params[:homepage].present?
        quizzes = quizzes.where(
          status: "published",
          show_on_homepage: true
        )
      end

      quizzes
    end

    def search(quizzes)
      return quizzes unless @params[:query].present?

      quizzes.where("quizzes.name ILIKE ?", "%#{@params[:query].strip}%")
    end

    def filter_category(quizzes)
      return quizzes unless @params[:category].present? && @params[:category].downcase != "all"

      category = Category.find_by("LOWER(name) = ?", @params[:category].downcase)
      return quizzes unless category

      quizzes.where(category_id: category.id)
    end

    def filter_status(quizzes)
      return quizzes unless @current_user
      return quizzes unless %w[draft published].include?(@params[:status])

      quizzes.where(status: @params[:status])
    end

    def serialize(quiz)
      quiz.as_json.merge(
        category_name: quiz.category&.name,
        submission_count: quiz.submissions.size,
        question_count: quiz.questions.count,
        organization_name: quiz.organization.name
      )
    end

    def paginate(quizzes)
      quizzes.order(created_at: :desc)
        .offset((page - 1) * page_size)
        .limit(page_size)
    end

    def draft_count
      return 0 unless @current_user

      Quiz.where(
        organization_id: @current_user.organization_id,
        status: "draft"
      ).count
    end

    def page
      @params[:page].to_i > 0 ? @params[:page].to_i : 1
    end

    def page_size
      @params[:pageSize].to_i > 0 ? @params[:pageSize].to_i : 10
    end

    def title
      case @params[:status]
      when "published" then "Published Quizzes"
      when "draft" then "Draft Quizzes"
      else "All Quizzes"
      end
    end
end
