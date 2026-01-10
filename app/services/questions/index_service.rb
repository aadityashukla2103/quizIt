# frozen_string_literal: true

module Questions
  class IndexService
    def initialize(quiz)
      @quiz = quiz
    end

    def call
      {
        data: @quiz.questions.includes(:options).map do |q|
          q.as_json.merge(
            options: q.options.as_json(only: [:id, :content, :is_correct])
          )
        end,
        status: :ok
      }
    end
  end
end
