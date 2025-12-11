# frozen_string_literal: true

module Questions
  class DestroyService
    def initialize(question)
      @question = question
    end

    def call
      @question.destroy
      {
        success: true,
        status: :ok,
        message: "Question deleted successfully",
        data: {}
      }
end
  end
end
