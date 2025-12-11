# frozen_string_literal: true

class Organization::IndexService
  def call
    { organizations: Organization.all }
    end
end
