# frozen_string_literal: true

module Questions
  class UpdateService
    def initialize(question, params)
      @question = question
      @params = params
    end

    def call
      ActiveRecord::Base.transaction do
        @question.update!(content: @params[:content])

        if @params[:options]
          @question.options.destroy_all

          @params[:options].each do |opt|
            @question.options.create!(
              content: opt[:content],
              is_correct: opt[:isCorrect]
            )
          end
        end
      end

      {
        message: "Question updated successfully",
        data: @question.as_json(include: :options),
        status: :ok
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
