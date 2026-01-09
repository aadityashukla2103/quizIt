# frozen_string_literal: true

class Api::V1::SubmissionAnswersController < Api::V1::BaseController
  before_action :set_submission_answer, only: [:show, :update, :destroy]

  def index
    submission_answers = SubmissionAnswers::IndexService.new.call
    render_json(submission_answers)
  end

  def show
    submission_answer = SubmissionAnswers::ShowService.new(@submission_answer).call
    render_json(submission_answer)
  end

  def create
    result = SubmissionAnswers::CreateService.new(submission_answer_params).call
    render_json(result[:data], result[:status])
  end

  def update
    result = SubmissionAnswers::UpdateService.new(@submission_answer, submission_answer_params).call
    render_message(result[:message], result[:status], result[:data])
  end

  def destroy
    result = SubmissionAnswers::DestroyService.new(@submission_answer).call
    render_message(result[:message], result[:status], result[:data])
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
