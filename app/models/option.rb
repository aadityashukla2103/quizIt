# frozen_string_literal: true

class Option < ApplicationRecord
  belongs_to :question
  validates :content, presence: true
  validates :is_correct, inclusion: { in: [true, false] }
  validates :content, presence: true,
    uniqueness: { scope: :question_id, case_sensitive: false }
end
