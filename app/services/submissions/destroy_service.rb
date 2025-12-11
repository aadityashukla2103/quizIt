# frozen_string_literal: true

module Submissions
  class DestroyService
    def initialize(submission)
      @submission = submission
    end

    def call
      @submission.destroy
      {
        message: I18n.t("submission.deleted_successfully"),
        status: :ok,
        data: {}
      }
    end
  end
end
