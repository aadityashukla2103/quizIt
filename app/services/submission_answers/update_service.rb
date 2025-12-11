# frozen_string_literal: true

module SubmissionAnswers
  class UpdateService
    def initialize(submission_answer, params)
      @submission_answer = submission_answer
      @params = params
    end

    def call
      if @submission_answer.update(@params)
        {
          message: I18n.t("submission_answer.updated_successfully"),
          status: :ok,
          data: { submission_answer: @submission_answer }
        }
      else
        {
          message: I18n.t("submission_answer.update_failed"),
          status: :unprocessable_entity,
          data: { errors: @submission_answer.errors.full_messages }
        }
      end
    end
  end
end
