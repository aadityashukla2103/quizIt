# frozen_string_literal: true

class Api::V1::Public::QuizzesController < Api::V1::BaseController
  def index
    quizzes = Quiz
      .joins(:organization)
      .includes(:category, :questions)
      .where(
        show_on_homepage: true,
        status: :published,
        organizations: { slug: params[:organization_slug] }
      ).limit(20)

    if params[:query].present?
      quizzes = quizzes.where(
        "quizzes.name ILIKE ?", "%#{params[:query]}%"
      )
    end

    if params[:category].present?
      quizzes = quizzes.where(category_id: params[:category])
    end

    render_json(
      quizzes: quizzes.map do |quiz|
        {
          id: quiz.id,
          slug: quiz.slug,
          name: quiz.name,
          time_limit: quiz.time_limit,
          category_name: quiz.category&.name,
          question_count: quiz.questions.size,
          organization_name: quiz.organization.name
        }
      end
    )
  end

  def show
    result = Public::Quizzes::ShowService.new(params[:id]).call
    render_message(result[:message], result[:status], result[:data])
  end
end
