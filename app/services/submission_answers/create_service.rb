# frozen_string_literal: true

module SubmissionAnswers
  class CreateService
    def initialize(params)
      @params = params
    end

    def call
      submission_answer = SubmissionAnswer.new(@params)

      if submission_answer.selected_option_id.present?
        option = Option.find(submission_answer.selected_option_id)
        submission_answer.is_correct = option.is_correct
      else
        submission_answer.is_correct = nil
      end

      if submission_answer.save
        {
          message: I18n.t("submission_answer.created_successfully"),
          status: :created,
          data: { submission_answer: submission_answer }
        }
      else
        {
          message: I18n.t("submission_answer.creation_failed"),
          status: :unprocessable_entity,
          data: { errors: submission_answer.errors.full_messages }
        }
      end
    end
  end
end
