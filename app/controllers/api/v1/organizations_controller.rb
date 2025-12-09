# frozen_string_literal: true

class Api::V1::OrganizationsController < Api::V1::BaseController
  before_action :set_organization, only: [:show, :update, :destroy]

  def index
    organizations = Organization.all
    render json: { organizations: organizations }
  end

  def show
    render_message(
      t("organization.fetched_successfully"),
      :ok,
      { organization: @organization }
    )
  end

  def create
    organization = Organization.new(organization_params)

    if organization.save
      render_message(
        t("organization.created_successfully"),
        :created,
        { organization: organization }
      )
    else
      render_message(
        t("organization.creation_failed"),
        :unprocessable_entity,
        { errors: organization.errors.full_messages }
      )
    end
  end

  def update
    new_name = organization_params[:name]
    existing_org = Organization.find_by(name: new_name)

    if existing_org && existing_org.id != @organization.id
      @organization.users.update_all(organization_id: existing_org.id)
      @organization = existing_org
    else
      @organization.update!(organization_params)
    end

    render_message(
      t("organization.updated_successfully"),
      :ok,
      { organization: @organization }
    )
  rescue ActiveRecord::RecordInvalid => e
    render_message(
      t("organization.update_failed"),
      :unprocessable_entity,
      { errors: e.record.errors.full_messages }
    )
  end

  def destroy
    @organization.destroy
    render_message(
      t("organization.deleted_successfully"),
      :ok
    )
  end

  private

    def set_organization
      @organization = Organization.find(params[:id])
    end

    def organization_params
      params.require(:organization).permit(:name)
    end
end
