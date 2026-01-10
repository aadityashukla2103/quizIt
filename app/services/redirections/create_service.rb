# frozen_string_literal: true

module Redirections
  class CreateService
    def initialize(params)
      @params = params
    end

    def call
      redirection = Redirection.new(@params)

      if redirection.save
        {
          success: true,
          message: "Redirection created successfully",
          status: :created,
          data: { redirection: redirection }
        }
      else
        {
          success: false,
          message: "Redirection creation failed",
          status: :unprocessable_entity,
          data: { errors: redirection.errors.full_messages }
        }
      end
    end
  end
end
