# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy
  has_many :submission_answers, dependent: :destroy

  validates :content, presence: true, uniqueness: { scope: :quiz_id }
  validates :position, numericality: { only_integer: true }, allow_nil: true

  before_create :set_position

  def clone_question!
    cloned_question = deep_clone include: :options
    base = "#{content} (Copy)"
    copy_number = 1
    while Question.exists?(quiz_id: quiz_id, content: "#{base} #{copy_number}")
      copy_number += 1
    end
    cloned_question.content = "#{base} #{copy_number}"
    cloned_question.save!
    cloned_question
  end

  private

    def set_position
      last_position = quiz.questions.maximum(:position) || 0
      self.position = last_position + 1
    end
end
