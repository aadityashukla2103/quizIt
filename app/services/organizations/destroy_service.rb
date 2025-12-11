# frozen_string_literal: true

module Organizations
  class DestroyService
    def initialize(organization)
      @organization = organization
    end

    def call
      @organization.destroy
      { success: true, status: :ok }
    rescue => e
      { success: false, errors: [e.message], status: :unprocessable_entity }
    end
  end
end
