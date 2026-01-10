# frozen_string_literal: true

module Questions
  class ShowService
    def initialize(question)
      @question = question
    end

    def call
      {
        status: :ok,
        data: @question.as_json(include: :options)
      }
    end
  end
end
