# frozen_string_literal: true

class Api::V1::OrganizationsController < Api::V1::BaseController
  before_action :set_organization, only: [:show, :update, :destroy]

  def index
    result = Organizations::IndexService.new.call
    render json: result
  end

  def show
    result = Organizations::ShowService.new(@organization).call
    render_service_result(result)
  end

  def create
    result = Organizations::CreateService.new(organization_params).call
    render_service_result(result)
  end

  def update
    result = Organizations::UpdateService.new(@organization, organization_params).call
    render_service_result(result)
  end

  def destroy
    result = Organizations::DestroyService.new(@organization).call
    render_service_result(result)
  end

  private

    def set_organization
      @organization = Organization.find(params[:id])
    end

    def organization_params
      params.require(:organization).permit(:name)
    end
end
