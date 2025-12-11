# frozen_string_literal: true

module Submissions
  class UpdateService
    def initialize(submission, params)
      @submission = submission
      @params = params
    end

    def call
      if @submission.update(@params)
        {
          message: I18n.t("submission.updated_successfully"),
          status: :ok,
          data: { submission: @submission }
        }
      else
        {
          message: I18n.t("submission.update_failed"),
          status: :unprocessable_entity,
          data: { errors: @submission.errors.full_messages }
        }
      end
    end
  end
end
