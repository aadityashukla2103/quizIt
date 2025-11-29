# frozen_string_literal: true

class Api::V1::SubmissionAnswersController < Api::V1::BaseController
  before_action :set_submission_answer, only: [:show, :update, :destroy]

  def index
    submission_answers = SubmissionAnswer.all
    render_json(submission_answers)
  end

  def show
    render_json(@submission_answer)
  end

  def create
    submission_answer = SubmissionAnswer.new(submission_answer_params)

    if submission_answer.save
      render_json(submission_answer, :created)
    else
      render json: { errors: submission_answer.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @submission_answer.update(submission_answer_params)
      render_json(@submission_answer)
    else
      render json: { errors: @submission_answer.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @submission_answer.destroy
    head :no_content
  end

  private

    def set_submission_answer
      @submission_answer = SubmissionAnswer.find(params[:id])
    end

    def submission_answer_params
      params.require(:submission_answer).permit(
        :submission_id,
        :question_id,
        :selected_option_id,
        :is_correct
      )
    end
end
