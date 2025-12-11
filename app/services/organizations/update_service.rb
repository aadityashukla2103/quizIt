# frozen_string_literal: true

module Organizations
  class UpdateService
    def initialize(organization, params)
      @organization = organization
      @params = params
    end

    def call
      new_name = @params[:name]
      existing_org = Organization.find_by(name: new_name)

      if existing_org && existing_org.id != @organization.id
        @organization.users.update_all(organization_id: existing_org.id)
        @organization = existing_org
      else
        @organization.update!(@params)
      end

      { success: true, organization: @organization, status: :ok }
    rescue ActiveRecord::RecordInvalid => e
      { success: false, errors: e.record.errors.full_messages, status: :unprocessable_entity }
    end
  end
end
