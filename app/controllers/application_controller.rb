# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include SetHoneyBadgerContext
  include Expirable
  before_action :handle_redirections

  private

    def ensure_current_user_is_superadmin!
      authenticate_user!

      unless current_user.admin?
        redirect_to root_path, status: :forbidden, alert: "Unauthorized Access!"
      end
    end

    def handle_redirections
      return if request.path.start_with?("/api")

      redirection = Redirection.find_by(from_path: request.path)
      return unless redirection

      redirect_to redirection.to_path, status: :moved_permanently, allow_other_host: true
    end
end
