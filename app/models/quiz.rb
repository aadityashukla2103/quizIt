# frozen_string_literal: true

class Quiz < ApplicationRecord
  enum status: { draft: 0, published: 1 }
  belongs_to :category
  has_many :submissions, dependent: :destroy
  has_many :questions, dependent: :destroy
  belongs_to :organization

  validates :name, presence: true, uniqueness: { scope: :organization_id }
  validates :status, presence: true

  def clone_with_questions!
    cloned_quiz = self.deep_clone include: { questions: :options }

    cloned_quiz.name = "#{self.name} (Copy)"
    cloned_quiz.status = "draft"
    cloned_quiz.category_id = self.category_id
    cloned_quiz.organization_id = self.organization_id

    cloned_quiz.save!
    cloned_quiz
  end
end
