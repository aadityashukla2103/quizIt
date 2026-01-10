# frozen_string_literal: true

class Api::V1::RedirectionsController < Api::V1::BaseController
  before_action :ensure_current_user_is_admin!
  before_action :set_redirection, only: [:update, :destroy]

  def index
    result = Redirections::IndexService.new.call
    render_json(result[:data], result[:status])
  end

  def create
    result = Redirections::CreateService.new(redirection_params).call

    if result[:success]
      render_message(result[:message], result[:status], result[:data])
    else
      render_error(result[:message], result[:status], result[:data])
    end
  end

  def update
    result = Redirections::UpdateService.new(@redirection, redirection_params).call

    if result[:success]
      render_message(result[:message], result[:status], result[:data])
    else
      render_error(result[:message], result[:status], result[:data])
    end
  end

  def destroy
    result = Redirections::DestroyService.new(@redirection).call

    if result[:success]
      render_message(result[:message], result[:status], result[:data])
    else
      render_error(result[:message], result[:status], result[:data])
    end
  end

  private

    def set_redirection
      @redirection = Redirection.find(params[:id])
    end

    def redirection_params
      params.require(:redirection).permit(:from_path, :to_path)
    end
end
