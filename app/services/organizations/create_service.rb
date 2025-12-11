# frozen_string_literal: true

module Organizations
  class CreateService
    def initialize(params)
      @params = params
    end

    def call
      org = Organization.new(@params)
      if org.save
        { success: true, organization: org, status: :created }
      else
        { success: false, errors: org.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end
end
