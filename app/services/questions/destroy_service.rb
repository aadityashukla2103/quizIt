# frozen_string_literal: true

module Questions
  class DestroyService
    def initialize(question)
      @question = question
      @quiz = question.quiz
    end

    def call
      ActiveRecord::Base.transaction do
        @question.destroy

        if @quiz.questions.count.zero?
          @quiz.update!(status: :draft)
        end
      end

      {
        message: "Question deleted successfully",
        data: {},
        status: :ok
      }
    rescue => e
      {
        message: "Failed to delete question",
        data: { errors: [e.message] },
        status: :unprocessable_entity
      }
    end
  end
end
