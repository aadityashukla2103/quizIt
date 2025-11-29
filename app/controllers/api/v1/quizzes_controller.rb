# frozen_string_literal: true

class Api::V1::QuizzesController < Api::V1::BaseController
  before_action :ensure_current_user_is_superadmin!, only: [:create, :update, :destroy]
  before_action :set_quiz, only: [:show, :update, :destroy]

  def index
    quizzes = Quiz.all
    render_json(quizzes)
  end

  def show
    render_json(@quiz)
  end

  def create
    quiz = Quiz.new(quiz_params)

    if quiz.save
      render_json(quiz, :created)
    else
      render json: { errors: quiz.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @quiz.update(quiz_params)
      render_json(@quiz)
    else
      render json: { errors: @quiz.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @quiz.destroy
    head :no_content
  end

  private

    def set_quiz
      @quiz = Quiz.find(params[:id])
    end

    def quiz_params
      params.require(:quiz).permit(:name, :status, :organization_id, :category_id)
    end

    def ensure_current_user_is_superadmin!
      user_email = request.headers["X-Auth-Email"].presence
      user = user_email && User.find_by(email: user_email)

      unless user&.super_admin?
        render_error("Unauthorized Access!", :forbidden)
        nil
      end
    end
end
