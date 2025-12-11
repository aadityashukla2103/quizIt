# frozen_string_literal: true

module SubmissionAnswers
  class DestroyService
    def initialize(submission_answer)
      @submission_answer = submission_answer
    end

    def call
      @submission_answer.destroy
      {
        message: I18n.t("submission_answer.deleted_successfully"),
        status: :ok,
        data: {}
      }
    end
  end
end
