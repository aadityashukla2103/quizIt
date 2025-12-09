# frozen_string_literal: true

class Api::V1::SubmissionsController < Api::V1::BaseController
  before_action :set_submission, only: [:show, :update, :destroy]

  def index
    submissions = Submission.all
    render_json(submissions)
  end

  def show
    submission = Submission.includes(submission_answers: { selected_option: {}, question: :options }).find(params[:id])

    render_json(
      submission.as_json(
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
          ))
  end

  def create
    submission = Submission.new(submission_params)
    submission.submitted_at ||= Time.current

    if submission.save
      render_message(
        t("submission.created_successfully"),
        :created,
        { submission: submission }
      )
    else
      render_message(
        t("submission.creation_failed"),
        :unprocessable_entity,
        { errors: submission.errors.full_messages }
      )
    end
  end

  def update
    if @submission.update(submission_params)
      render_message(
        t("submission.updated_successfully"),
        :ok,
        { submission: @submission }
      )
    else
      render_message(
        t("submission.update_failed"),
        :unprocessable_entity,
        { errors: @submission.errors.full_messages }
      )
    end
  end

  def destroy
    @submission.destroy
    render_message(t("submission.deleted_successfully"), :ok)
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

    render_message(
      t("submission.finalized_successfully"),
      :ok,
      { submission: submission }
    )
  end

  def quiz_submissions
    submissions = Submission.where(quiz_id: params[:quiz_id])

    if params[:search].present?
      submissions = submissions.where("guest_name ILIKE ?", "%#{params[:search]}%")
    end

    if params[:email].present?
      submissions = submissions.where("guest_email ILIKE ?", "%#{params[:email]}%")
    end

    if params[:status].present?
      submissions = submissions.where(status: params[:status])
    end

    render_json(
      submissions.as_json(
        only: [
          :id,
          :quiz_id,
          :user_id,
          :status,
          :submitted_at,
          :correct_answers,
          :wrong_answers,
          :total_questions,
          :guest_name,
          :guest_email
        ]
          ))
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
