# frozen_string_literal: true

class Api::V1::SubmissionsController < Api::V1::BaseController
  before_action :set_submission, only: [:show, :update, :destroy]

  def index
    submissions = Submission.all
    render_json(submissions)
  end

  def show
    submission = Submission.includes(submission_answers: { selected_option: {}, question: :options }).find(params[:id])

    render json: submission.as_json(
      include: {
        submission_answers: {
          include: {
            selected_option: { only: [:id, :content, :is_correct] },
            question: {
              only: [:id, :content],
              include: { options: { only: [:id, :content, :is_correct] } }
            }
          }
        }
      }
    )
  end

  def create
    submission = Submission.new(submission_params)

    submission.submitted_at ||= Time.current

    if submission.save
      render json: { submission: submission }, status: :created
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

  def finalize
    submission = Submission.find(params[:id])
    answers = submission.submission_answers

    submission.update(
      total_questions: answers.count,
      correct_answers: answers.where(is_correct: true).count,
      wrong_answers: answers.where(is_correct: false).count,
      status: "completed",
      submitted_at: Time.current
    )

    render json: submission
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
