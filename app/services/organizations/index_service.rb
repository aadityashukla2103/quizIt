# frozen_string_literal: true

module Organizations
  class IndexService
    def call
      organizations = Organization.all
      {
        success: true,
        message: "Organizations fetched successfully",
        data: { organizations: organizations.map { |org| org.as_json } }, # wrap array inside hash
        status: :ok
      }
    end
  end
end
