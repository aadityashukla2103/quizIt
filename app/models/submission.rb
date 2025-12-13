# frozen_string_literal: true

class Submission < ApplicationRecord
  enum status: { incomplete: 0, completed: 1 }
  belongs_to :quiz
  belongs_to :user, optional: true

  has_many :submission_answers, dependent: :destroy

  def time_over?
    return false unless quiz.time_limit && started_at

    Time.current >= started_at + quiz.time_limit.minutes
  end
end
