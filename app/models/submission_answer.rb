# frozen_string_literal: true

class SubmissionAnswer < ApplicationRecord
  belongs_to :submission
  belongs_to :question
  belongs_to :selected_option, class_name: "Option"
  validates :is_correct, inclusion: { in: [true, false] }
end
