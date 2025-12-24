# frozen_string_literal: true

module Organizations
  class ShowService
    def initialize(organization)
      @organization = organization
    end

    def call
      {
        success: true,
        message: "Organization fetched successfully",
        data: { organization: @organization.as_json },
        status: :ok
      }
    end
  end
end
