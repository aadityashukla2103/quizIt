  # frozen_string_literal: true

  class Organizations::ShowService
    def initialize(organization)
      @organization = organization
    end

    def call
      { success: true, organization: @organization, status: :ok }
    end
  end
