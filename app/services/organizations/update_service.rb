# frozen_string_literal: true

module Organizations
  class UpdateService
    def initialize(organization, params)
      @organization = organization
      @params = params
    end

    def call
      @organization.update!(@params)

      {
        message: "Organization updated successfully",
        data: { organization: @organization.as_json },
        status: :ok
      }
    rescue ActiveRecord::RecordInvalid => e
      {
        message: "Validation failed",
        data: { errors: e.record.errors.full_messages },
        status: :unprocessable_entity
      }
    end
  end
end
