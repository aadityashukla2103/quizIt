# frozen_string_literal: true

class Api::V1::GuestRegistrationsController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token

  def create
    quiz = Quiz.find_by!(slug: params[:quiz_id])

    result = GuestRegistrations::CreateService.new(
      first_name: params[:firstName],
      last_name: params[:lastName],
      email: params[:email],
      quiz_id: quiz.id
    ).call

    if result[:success]
      render_json(result[:data], result[:status])
    else
      render_error(result[:message], result[:status], result[:data])
    end
  end
end
