# frozen_string_literal: true

class QuizMailer < ApplicationMailer
  def submission_email(quiz, submission)
    @quiz = quiz
    @submission = submission

    mail(
      to: quiz.creator.email,
      subject: "#{quiz.name} submitted by #{@submission.guest_name}"
    )
  end
end
