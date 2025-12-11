# frozen_string_literal: true

class Quizzes::DestroyService
  def initialize(quiz)
    @quiz = quiz
  end

  def call
    if @quiz.destroy
      { message: "Quiz deleted successfully", status: :ok, data: {} }
    else
      { message: "Quiz deletion failed", status: :unprocessable_entity, data: { errors: @quiz.errors.full_messages } }
    end
  end
end
