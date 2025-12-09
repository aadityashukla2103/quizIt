# frozen_string_literal: true

class Api::V1::GuestRegistrationsController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token

  def create
    guest_name = "#{params[:firstName]} #{params[:lastName]}"
    guest_email = params[:email].downcase
    quiz_id = params[:quiz_id]

    if User.exists?(email: guest_email)
      render_message(
        t("guest_registration.email_already_registered"),
        :unprocessable_entity
      )
      return
    end

    if Submission.exists?(quiz_id: quiz_id, guest_email: guest_email)
      render_message(
        t("guest_registration.already_registered_for_quiz"),
        :unprocessable_entity
      )
      return
    end

    submission = Submission.new(
      guest_name: guest_name,
      guest_email: guest_email,
      quiz_id: quiz_id,
      status: 0
    )

    if submission.save
      render_message(
        t("guest_registration.registered_successfully"),
        :created,
        { submission_id: submission.id }
      )
    else
      render_message(
        t("guest_registration.registration_failed"),
        :unprocessable_entity,
        { errors: submission.errors.full_messages }
      )
    end
  end
end
