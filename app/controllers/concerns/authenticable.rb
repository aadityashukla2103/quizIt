# frozen_string_literal: true

module Authenticable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user_using_x_auth_token
    before_action :authenticate_user!, unless: :public_action?
  end

  private

    def authenticate_user_using_x_auth_token
      user_email = request.headers["X-Auth-Email"].presence
      auth_token = request.headers["X-Auth-Token"].presence
      user = user_email && User.find_by(email: user_email)

      if user && auth_token && Devise.secure_compare(user.authentication_token, auth_token)
        sign_in user, store: false
      elsif public_action?
        # Allow public access
        nil
      else
        render_error(t("invalid_credentials"), :unauthorized)
      end
    end

    # Define which actions are public
    def public_action?
      controller_name == "quizzes" && ["index", "show", "create_submission"].include?(action_name)
    end
end
