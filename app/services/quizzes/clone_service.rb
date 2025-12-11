# frozen_string_literal: true

class Quizzes::CloneService
  def initialize(quiz)
    @quiz = quiz
  end

  def call
    cloned_quiz = @quiz.clone_with_questions!
    { message: "Quiz cloned successfully", status: :created, data: { quiz: cloned_quiz } }
  rescue ActiveRecord::RecordInvalid => e
    { message: "Quiz clone failed", status: :unprocessable_entity, data: { errors: e.record.errors.full_messages } }
  end
end
