# frozen_string_literal: true

module Questions
  class DestroyService
    def initialize(question)
      @question = question
    end

    def call
      @question.destroy
      {
        message: "Question deleted successfully",
        data: {},
        status: :no_content
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
