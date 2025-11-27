# frozen_string_literal: true

class Api::V1::SubmissionAnswersController < ApplicationController
  before_action :set_submission_answer, only: [:update, :destroy]

  def create
    submission_answer = SubmissionAnswer.new(submission_answer_params)

    if submission_answer.save
      render json: submission_answer, status: :created
    else
      render json: { errors: submission_answer.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @submission_answer.update(submission_answer_params)
      render json: @submission_answer
    else
      render json: { errors: @submission_answer.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @submission_answer.destroy
    render json: { message: "Submission answer deleted" }, status: :ok
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
