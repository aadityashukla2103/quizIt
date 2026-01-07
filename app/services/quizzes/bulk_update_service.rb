# frozen_string_literal: true

class Quizzes::BulkUpdateService
  def initialize(params)
    @ids = params[:ids]
    @updates = params[:updates].to_unsafe_h
  end

  def call
    return error_response if @updates.blank?

    if publishing?
      return publish_quizzes
    end

    Quiz.where(id: @ids).update_all(@updates)
    success_response
  end

  private

    def publishing?
      @updates["status"] == "published"
    end

    def publish_quizzes
      quizzes = Quiz.where(id: @ids)

      invalid_quiz = quizzes.detect { |quiz| quiz.questions.count.zero? }

      if invalid_quiz
        {
          message: "Some quizzes cannot be published",
          status: :unprocessable_entity,
          data: {
            error: "All quizzes must have at least one question to publish"
          }
        }
      else
        quizzes.update_all(status: "published")
        success_response
      end
    end

    def success_response
      { message: "Quizzes updated successfully", status: :ok, data: {} }
    end

    def error_response
      { message: "No fields to update", status: :bad_request, data: {} }
    end
end
