# frozen_string_literal: true

class Quizzes::UpdateService
  def initialize(quiz, params)
    @quiz = quiz
    @params = params
  end

  def call
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
end
