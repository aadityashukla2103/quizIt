# frozen_string_literal: true

module Questions
  class CreateService
    def initialize(quiz, params)
      @quiz = quiz
      @params = params
    end

    def call
      question = @quiz.questions.build(content: @params[:content])

      ActiveRecord::Base.transaction do
        question.save!
        if @params[:options]
          @params[:options].each do |opt|
            question.options.create!(
              content: opt[:content],
              is_correct: opt[:isCorrect]
            )
          end
        end
      end

      {
        message: "Question created successfully",
        data: { question: question.as_json(include: :options) },
        status: :created
      }
    rescue ActiveRecord::RecordInvalid => e
      {
        message: "Validation failed",
        data: { error: e.record.errors.full_messages },
        status: :unprocessable_entity
      }
    end
  end
end
