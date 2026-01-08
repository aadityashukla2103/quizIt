# frozen_string_literal: true

module Public
  module Quizzes
    class ShowService
      def initialize(id)
        @quiz = Quiz.includes(questions: :options).find(id)
      end

      def call
        questions = @quiz.questions.to_a
        questions.shuffle! if @quiz.randomize_questions

        questions_with_options = questions.map do |question|
          options = question.options.to_a
          options.shuffle! if @quiz.randomize_options

          question.as_json(only: [:id, :content]).merge(
            options: options.as_json(only: [:id, :content])
          )
        end

        {
          message: "",
          status: :ok,
          data: {
            quiz: public_quiz_json,
            questions: questions_with_options,
            last_saved_at: nil
          }
        }
      end

      private

        def public_quiz_json
          @quiz.as_json(
            only: [
              :id,
              :name,
              :time_limit,
              :randomize_questions,
              :randomize_options
            ]
          )
        end
    end
  end
end
