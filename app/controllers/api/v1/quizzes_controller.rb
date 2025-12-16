# frozen_string_literal: true

class Api::V1::QuizzesController < Api::V1::BaseController
  before_action :ensure_current_user_is_admin!, only: [:create, :update, :destroy, :clone, :bulk_update, :bulk_delete]
  before_action :set_quiz, only: [:show, :update, :destroy, :clone]

  def index
    result = Quizzes::IndexService.new(@current_user, params).call
    render_message(result[:message], :ok, result[:data])
  end

  def show
    result = Quizzes::ShowService.new(@quiz.id).call
    render_message(result[:message], :ok, result[:data])
  end

  def create
    result = Quizzes::CreateService.new(@current_user, quiz_params).call
    render_message(result[:message], result[:status], result[:data])
  end

  def update
    result = Quizzes::UpdateService.new(@quiz, quiz_params).call
    render_message(result[:message], result[:status], result[:data])
  end

  def destroy
    result = Quizzes::DestroyService.new(@quiz).call
    render_message(result[:message], result[:status], result[:data])
  end

  def clone
    result = Quizzes::CloneService.new(@quiz).call
    render_message(result[:message], result[:status], result[:data])
  end

  def bulk_update
    result = Quizzes::BulkUpdateService.new(bulk_params).call
    render_message(result[:message], result[:status], result[:data])
  end

  def bulk_delete
    result = Quizzes::BulkDeleteService.new(bulk_params[:ids]).call
    render_message(result[:message], result[:status], result[:data])
  end

  private

    def set_quiz
      @quiz = Quiz.find(params[:id])
    end

    def quiz_params
      params.require(:quiz).permit(
        :name, :category_id, :status, :show_on_homepage, :time_limit, :randomize_questions,
        :randomize_options, :email_notifications)
    end

    def bulk_params
      params.require(:quiz).permit(ids: [], updates: {})
    end

    def ensure_current_user_is_admin!
      user_email = request.headers["X-Auth-Email"].presence
      @current_user = user_email && User.find_by(email: user_email)

      unless @current_user&.admin?
        render_error("Unauthorized Access!", :forbidden)
      end
    end
end
