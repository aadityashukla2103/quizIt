# frozen_string_literal: true

class Api::V1::SubmissionsController < Api::V1::BaseController
  before_action :set_submission, only: [:show, :update, :destroy, :finalize]

  def index
    submissions = Submissions::IndexService.new.call
    render_json(submissions)
  end

  def show
    submission = Submissions::ShowService.new(@submission).call
    render_json(submission)
  end

  def create
    result = Submissions::CreateService.new(submission_params).call
    render_message(result[:message], result[:status], result[:data])
  end

  def update
    result = Submissions::UpdateService.new(@submission, submission_params).call
    render_message(result[:message], result[:status], result[:data])
  end

  def destroy
    result = Submissions::DestroyService.new(@submission).call
    render_message(result[:message], result[:status], result[:data])
  end

  def finalize
    result = Submissions::FinalizeService.new(@submission).call
    render_message(result[:message], result[:status], result[:data])
  end

  def quiz_submissions
    submissions = Submissions::QuizSubmissionsService.new(params).call
    render_json(submissions)
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
        :submitted_at,
        :guest_name,
        :guest_email
      )
    end
end
