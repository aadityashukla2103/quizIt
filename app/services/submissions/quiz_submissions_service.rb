# frozen_string_literal: true

class Submissions::QuizSubmissionsService
  def initialize(quiz, params)
    @quiz = quiz
    @params = params
  end

  def call
    page = @params[:page].to_i > 0 ? @params[:page].to_i : 1
    page_size = @params[:page_size].to_i > 0 ? @params[:page_size].to_i : 10

    submissions = Submission.where(quiz_id: @quiz.id)

    submissions = submissions.where("guest_name ILIKE ?", "%#{@params[:name]}%") if @params[:name].present?
    submissions = submissions.where("guest_email ILIKE ?", "%#{@params[:email]}%") if @params[:email].present?
    submissions = submissions.where(status: @params[:status]) if @params[:status].present?

    total_count = submissions.count

    submissions = submissions
      .order(created_at: :desc)
      .offset((page - 1) * page_size)
      .limit(page_size)

    {
      submissions: submissions,
      total_count: total_count,
      quiz_name: @quiz.name

    }
  end
end
