# frozen_string_literal: true

class Api::V1::RedirectionsController < Api::V1::BaseController
  before_action :ensure_current_user_is_admin!
  before_action :set_redirection, only: [:update, :destroy]

  def index
    redirections = Redirection.order(created_at: :asc)
    render_message(
      "",
      :ok,
      { redirections: redirections }
    )
  end

  def create
    redirection = Redirection.new(redirection_params)

    if redirection.save
      render_message(
        "Redirection created",
        :created,
        { redirection: redirection }
      )
    else
      render_error(
        redirection.errors.full_messages.join(", "),
        :unprocessable_entity
      )
    end
  end

  def update
    if @redirection.update(redirection_params)
      render_message(
        "Redirection updated",
        :ok,
        { redirection: @redirection }
      )
    else
      render_error(
        @redirection.errors.full_messages.join(", "),
        :unprocessable_entity
      )
    end
  end

  def destroy
    @redirection.destroy
    render_message(
      "Redirection deleted",
      :ok,
      {}
    )
  end

  private

    def set_redirection
      @redirection = Redirection.find(params[:id])
    end

    def redirection_params
      params.require(:redirection).permit(:from_path, :to_path)
    end
end
