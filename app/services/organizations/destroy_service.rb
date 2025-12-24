# frozen_string_literal: true

module Organizations
  class DestroyService
    def initialize(organization)
      @organization = organization
    end

    def call
      if @organization.destroy
        {
          success: true,
          message: "Organization deleted successfully",
          data: {},
          status: :no_content
        }
      else
        {
          success: false,
          message: "Organization deletion failed",
          data: { errors: @organization.errors.full_messages },
          status: :unprocessable_entity
        }
      end
    end
  end
end
