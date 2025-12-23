# frozen_string_literal: true

class Api::V1::OrganizationsController < Api::V1::BaseController
  before_action :set_organization, only: [:show, :update, :destroy]

  def index
    result = Organizations::IndexService.new.call
    render_message(result[:message], :ok, result[:data])
  end

  def show
    result = Organizations::ShowService.new(@organization).call
    render_message(result[:message], result[:status], result[:data])
  end

  def create
    result = Organizations::CreateService.new(organization_params).call
    render_message(result[:message], result[:status], result[:data])
  end

  def update
    result = Organizations::UpdateService.new(@organization, organization_params).call
    render_message(result[:message], result[:status], result[:data])
  end

  def destroy
    result = Organizations::DestroyService.new(@organization).call
    render_message(result[:message], result[:status], result[:data])
  end

  private

    def set_organization
      @organization = Organization.find(params[:id])
    end

    def organization_params
      params.require(:organization).permit(:name)
    end
end
