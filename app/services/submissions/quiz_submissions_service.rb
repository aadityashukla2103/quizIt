# frozen_string_literal: true

module Submissions
  class QuizSubmissionsService
    def initialize(params)
      @params = params
    end

    def call
      submissions = Submission.where(quiz_id: @params[:quiz_id])

      submissions = submissions.where("guest_name ILIKE ?", "%#{@params[:search]}%") if @params[:search].present?
      submissions = submissions.where("guest_email ILIKE ?", "%#{@params[:email]}%") if @params[:email].present?
      submissions = submissions.where(status: @params[:status]) if @params[:status].present?

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
      )
    end
  end
end
