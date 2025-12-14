# frozen_string_literal: true

class Quizzes::ShowService
  def initialize(id)
    @quiz = Quiz.includes(questions: :options).find(id)
  end

  def call
    questions = @quiz.questions.to_a

    questions.shuffle! if @quiz.randomize_questions

    questions_with_options = questions.map do |question|
      options = question.options.to_a

      options.shuffle! if @quiz.randomize_options

      question.as_json.merge(
        options: options.as_json
      )
    end

    {
      message: "Quiz fetched successfully",
      status: :ok,
      data: {
        quiz: @quiz.as_json,
        questions: questions_with_options,
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

      latest_time
        .in_time_zone("Asia/Kolkata")
        .strftime("%I:%M%p, %d %B %Y")
    end
end
