# frozen_string_literal: true

module Questions
  class CloneService
    def initialize(question)
      @question = question
    end

    def call
      cloned = @question.clone_question!

      {
        message: "Question cloned successfully",
        data: cloned.as_json(include: :options),
        status: :created
      }
    rescue ActiveRecord::RecordInvalid => e
      {
        message: "Validation failed",
        data: { errors: e.record.errors.full_messages },
        status: :unprocessable_entity
      }
    end
  end
end
