# frozen_string_literal: true

module Redirections
  class IndexService
    def call
      {
        success: true,
        status: :ok,
        data: {
          redirections: Redirection.order(created_at: :asc)
        }
      }
    end
  end
end
