# frozen_string_literal: true

class SubmissionsController < ApplicationController
  before_action :set_submission, only: [:show, :update, :destroy]

  def index
    submissions = Submission.all
    render json: submissions
  end

  def show
    render json: @submission
  end

  def create
    submission = Submission.new(submission_params)

    if submission.save
      render json: submission, status: :created
    else
      render json: { errors: submission.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @submission.update(submission_params)
      render json: @submission
    else
      render json: { errors: @submission.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @submission.destroy
    render json: { message: "Deleted successfully" }
  end

  private

    def set_submission
      @submission = Submission.find(params[:id])
    end

    def submission_params
      params.require(:submission).permit(
        :user_id,
        :quiz_id,
        :correct_answers,
        :wrong_answers,
        :total_questions,
        :status,
        :submitted_at
      )
    end
end
