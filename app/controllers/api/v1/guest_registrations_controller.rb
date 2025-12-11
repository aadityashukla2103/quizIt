# frozen_string_literal: true

class Api::V1::GuestRegistrationsController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token

  def create
    result = GuestRegistrations::CreateService.new(
      first_name: params[:firstName],
      last_name: params[:lastName],
      email: params[:email],
      quiz_id: params[:quiz_id]
    ).call

    render_message(result[:message], result[:status], result[:data])
  end
end
