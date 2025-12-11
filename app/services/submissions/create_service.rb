# frozen_string_literal: true

module Submissions
  class CreateService
    def initialize(params)
      @params = params
    end

    def call
      submission = Submission.new(@params)
      submission.submitted_at ||= Time.current

      if submission.save
        {
          message: I18n.t("submission.created_successfully"),
          status: :created,
          data: { submission: submission }
        }
      else
        {
          message: I18n.t("submission.creation_failed"),
          status: :unprocessable_entity,
          data: { errors: submission.errors.full_messages }
        }
      end
    end
  end
end
