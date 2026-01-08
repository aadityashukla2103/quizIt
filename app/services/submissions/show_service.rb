# frozen_string_literal: true

module Submissions
  class ShowService
    def initialize(submission)
      @submission = submission
      @quiz = submission.quiz
      @organization = @quiz.organization
    end

    def call
      {
        id: @submission.id,
        total_questions: @quiz.questions.count,
        correct_answers: @submission.correct_answers,
        wrong_answers: @submission.wrong_answers,
        submission_answers: build_answers,
        remaining_time: remaining_time,
        organization_slug: @organization.slug
      }
    end

    private

      def build_answers
        answers_map = @submission.submission_answers.index_by(&:question_id)

        @quiz.questions.order(:position).map do |question|
          answer = answers_map[question.id]

          {
            question: {
              id: question.id,
              content: question.content,
              options: question.options.map do |o|
                {
                  id: o.id,
                  content: o.content,
                  is_correct: o.is_correct
                }
              end
            },
            selected_option: answer&.selected_option,
            is_correct: answer&.is_correct,
            attempted: answer.present?
          }
        end
      end

      def remaining_time
        return nil unless @quiz.time_limit && @submission.started_at

        remaining = (@submission.started_at + @quiz.time_limit.minutes - Time.current).to_i
        [remaining, 0].max
      end
  end
end
