# frozen_string_literal: true

module Redirections
  class DestroyService
    def initialize(redirection)
      @redirection = redirection
    end

    def call
      @redirection.destroy
      {
        success: true,
        message: "Redirection deleted successfully",
        status: :ok,
        data: {}
      }
    rescue => e
      {
        success: false,
        message: "Failed to delete redirection",
        status: :unprocessable_entity,
        data: { errors: [e.message] }
      }
    end
  end
end
