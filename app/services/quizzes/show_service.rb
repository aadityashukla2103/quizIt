# frozen_string_literal: true

class Quizzes::ShowService
  def initialize(id)
    @quiz = Quiz.includes(questions: :options).find(id)
  end

  def call
    {
      message: "Quiz fetched successfully",
      status: :ok,
      data: {
        quiz: @quiz.as_json,
        questions: @quiz.questions.as_json(include: :options),
        last_saved_at: last_saved_at
      }
    }
  end

  private

    def last_saved_at
      latest_time = [
        @quiz.updated_at,
        @quiz.questions.maximum(:updated_at),
        Option.where(question_id: @quiz.question_ids).maximum(:updated_at)
      ].compact.max

      return nil unless latest_time > @quiz.created_at

      latest_time.in_time_zone("Asia/Kolkata")
        .strftime("%I:%M%p, %d %B %Y")
    end
end
