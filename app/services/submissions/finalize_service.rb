# frozen_string_literal: true

module Submissions
  class FinalizeService
    def initialize(submission)
      @submission = submission
    end

    def call
      answers = @submission.submission_answers
      @submission.update(
        total_questions: answers.count,
        correct_answers: answers.where(is_correct: true).count,
        wrong_answers: answers.where(is_correct: false).count,
        status: "completed",
        submitted_at: Time.current
      )

      {
        message: I18n.t("submission.finalized_successfully"),
        status: :ok,
        data: { submission: @submission }
      }
    end
  end
end
