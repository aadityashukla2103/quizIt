# frozen_string_literal: true

module Redirections
  class CreateService
    def initialize(params, organization)
      @params = params
      @organization = organization
    end

    def call
      redirection = Redirection.new(@params)
      redirection.organization = @organization
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
