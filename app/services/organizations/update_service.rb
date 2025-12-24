# frozen_string_literal: true

module Organizations
  class UpdateService
    def initialize(user, params)
      @user = user
      @params = params
    end

    def call
      existing_org = Organization.find_by(name: @params[:name])

      if existing_org
        @user.organization = existing_org
        @user.save!
        {
          success: true,
          message: "User linked to existing organization",
          data: { organization: existing_org.as_json, quizzes: existing_org.quizzes.as_json },
          status: :ok
        }
      else
        if @user.organization.update(@params)
          {
            success: true,
            message: "Organization updated successfully",
            data: { organization: @user.organization.as_json, quizzes: @user.organization.quizzes.as_json },
            status: :ok
          }
        else
          {
            success: false,
            message: "Organization update failed",
            data: { errors: @user.organization.errors.full_messages },
            status: :unprocessable_entity
          }
        end
      end
    end
  end
end
