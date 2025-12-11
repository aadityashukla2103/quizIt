# frozen_string_literal: true

class GuestRegistrations::CreateService
  def initialize(first_name:, last_name:, email:, quiz_id:)
    @guest_name = "#{first_name} #{last_name}"
    @guest_email = email.downcase
    @quiz_id = quiz_id
  end

  def call
    return email_already_registered if User.exists?(email: @guest_email)
    return already_registered_for_quiz if Submission.exists?(quiz_id: @quiz_id, guest_email: @guest_email)

    submission = Submission.new(
      guest_name: @guest_name,
      guest_email: @guest_email,
      quiz_id: @quiz_id,
      status: 0
    )

    if submission.save
      success(submission.id)
    else
      failed(submission.errors.full_messages)
    end
  end

  private

    def email_already_registered
      {
        success: false,
        message: I18n.t("guest_registration.email_already_registered"),
        status: :unprocessable_entity,
        data: {}
      }
    end

    def already_registered_for_quiz
      {
        success: false,
        message: I18n.t("guest_registration.already_registered_for_quiz"),
        status: :unprocessable_entity,
        data: {}
      }
    end

    def success(submission_id)
      {
        success: true,
        message: I18n.t("guest_registration.registered_successfully"),
        status: :created,
        data: { submission_id: submission_id }
      }
    end

    def failed(errors)
      {
        success: false,
        message: I18n.t("guest_registration.registration_failed"),
        status: :unprocessable_entity,
        data: { errors: errors }
      }
    end
end
