# frozen_string_literal: true

module Organizations
  class CreateService
    def initialize(params)
      @params = params
    end

    def call
      org = Organization.new(@params)

      if org.save
        {
          success: true,
          message: "Organization created successfully",
          data: { organization: org.as_json },
          status: :created
        }
      else
        {
          success: false,
          message: "Organization creation failed",
          data: { errors: org.errors.full_messages },
          status: :unprocessable_entity
        }
      end
    end
  end
end
