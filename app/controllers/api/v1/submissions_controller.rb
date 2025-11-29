# frozen_string_literal: true

class Api::V1::SubmissionsController < Api::V1::BaseController
  before_action :set_submission, only: [:show, :update, :destroy]

  def index
    submissions = Submission.all
    render_json(submissions)
  end

  def show
    render_json(@submission)
  end

  def create
    submission = Submission.new(submission_params)

    if submission.save
      render_json(submission, :created)
    else
      render json: { errors: submission.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @submission.update(submission_params)
      render_json(@submission)
    else
      render json: { errors: @submission.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @submission.destroy
    head :no_content
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
