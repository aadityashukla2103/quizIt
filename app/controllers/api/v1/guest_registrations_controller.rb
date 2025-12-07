# frozen_string_literal: true

class Api::V1::GuestRegistrationsController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token
  def create
    guest_name = "#{params[:firstName]} #{params[:lastName]}"
    guest_email = params[:email].downcase
    quiz_id = params[:quiz_id]

    if User.exists?(email: guest_email)
      render json: { error: "This email is already registered as a user." }, status: :unprocessable_entity
      return
    end

    if Submission.exists?(quiz_id: quiz_id, guest_email: guest_email)
      render json: { error: "You have already registered for this quiz." }, status: :unprocessable_entity
      return
    end

    submission = Submission.new(
      guest_name: guest_name,
      guest_email: guest_email,
      quiz_id: quiz_id,
      status: 0
    )

    if submission.save
      render json: { submission_id: submission.id }, status: :created
    else
      render json: { errors: submission.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
