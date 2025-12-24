# frozen_string_literal: true

module Organizations
  class UpdateService
    def initialize(organization, params)
      @organization = organization
      @params = params
    end

    def call
      if @organization.update(@params)
        {
          success: true,
          message: "Organization updated successfully",
          data: { organization: @organization.as_json },
          status: :ok
        }
      else
        {
          success: false,
          message: "Organization update failed",
          data: { errors: @organization.errors.full_messages },
          status: :unprocessable_entity
        }
      end
    end
  end
end
