# frozen_string_literal: true

module Submissions
  class FinalizeService
    def initialize(submission)
      @submission = submission
      @quiz = submission.quiz
    end

    def call
      return already_completed if @submission.submitted_at.present?

      answers = @submission.submission_answers

      total_questions = @quiz.questions.count
      correct_answers = answers.where(is_correct: true).count
      wrong_answers = answers.where(is_correct: false).count

      @submission.update!(
        total_questions: total_questions,
        correct_answers: correct_answers,
        wrong_answers: wrong_answers,
        status: "completed",
        submitted_at: Time.current
      )

      send_email_notification

      {
        message: I18n.t("submission.finalized_successfully"),
        status: :ok,
        data: { submission: @submission }
      }
    end

    private

      def already_completed
        {
          message: I18n.t("submission.already_finalized"),
          status: :ok,
          data: { submission: @submission }
        }
      end

      def send_email_notification
        return unless @quiz.email_notifications

        QuizMailer
          .submission_email(@quiz, @submission)
          .deliver_later
      end
  end
end
