# frozen_string_literal: true

class Quiz < ApplicationRecord
  enum status: { draft: 0, published: 1 }
  belongs_to :category
  belongs_to :creator, class_name: "User"

  has_many :submissions, dependent: :destroy
  has_many :questions, dependent: :destroy
  belongs_to :organization

  validates :name, presence: true, uniqueness: { scope: :organization_id }, length: { maximum: 30 }
  validates :status, presence: true

  def clone_with_questions!
    cloned_quiz = self.deep_clone include: { questions: :options }

    base_name = "#{self.name.truncate(20)} (Copy)"
    counter = 1
    new_name = base_name

    while Quiz.exists?(organization_id: self.organization_id, name: new_name)
      counter += 1
      new_name = "#{base_name} #{counter}"
    end

    cloned_quiz.name = new_name
    cloned_quiz.status = "draft"
    cloned_quiz.category_id = self.category_id
    cloned_quiz.organization_id = self.organization_id

    cloned_quiz.save!
    cloned_quiz
  end
end
