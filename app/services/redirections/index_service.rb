# frozen_string_literal: true

module Redirections
  class IndexService
    def initialize(organization)
      @organization = organization
    end

    def call
      {
        success: true,
        status: :ok,
        data: {
          redirections: @organization.redirections.order(created_at: :asc)
        }
      }
    end
  end
end
