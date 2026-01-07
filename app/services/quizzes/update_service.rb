# frozen_string_literal: true

class Quizzes::UpdateService
  def initialize(quiz, params)
    @quiz = quiz
    @params = params
  end

  def call
    if publishing_without_questions?
      return {
        message: "Quiz must have at least one question to publish",
        status: :unprocessable_entity,
        data: { errors: ["Add at least one question before publishing"] }
      }
    end

    if @quiz.update(@params)
      {
        message: "Quiz updated successfully",
        status: :ok,
        data: { quiz: @quiz }
      }
    else
      {
        message: "Quiz update failed",
        status: :unprocessable_entity,
        data: { errors: @quiz.errors.full_messages }
      }
    end
  end

  private

    def publishing_without_questions?
      @params.dig(:status) == "published" && @quiz.questions.count.zero?
    end
end
