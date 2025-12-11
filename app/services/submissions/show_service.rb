# frozen_string_literal: true

module Submissions
  class ShowService
    def initialize(submission)
      @submission = submission
    end

    def call
      @submission.as_json(
        include: {
          submission_answers: {
            include: {
              selected_option: { only: [:id, :content, :is_correct] },
              question: {
                only: [:id, :content],
                include: { options: { only: [:id, :content, :is_correct] } }
              }
            }
          }
        }
      )
    end
  end
end
