# frozen_string_literal: true

module Redirections
  class UpdateService
    def initialize(redirection, params)
      @redirection = redirection
      @params = params
    end

    def call
      if @redirection.update(@params)
        {
          success: true,
          message: "Redirection updated successfully",
          status: :ok,
          data: { redirection: @redirection }
        }
      else
        {
          success: false,
          message: "Redirection update failed",
          status: :unprocessable_entity,
          data: { errors: @redirection.errors.full_messages }
        }
      end
    end
  end
end
