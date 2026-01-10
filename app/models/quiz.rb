# frozen_string_literal: true

class Quiz < ApplicationRecord
  enum status: { draft: 0, published: 1 }

  belongs_to :category
  belongs_to :creator, class_name: "User"
  belongs_to :organization

  has_many :submissions, dependent: :destroy
  has_many :questions, dependent: :destroy

  validates :name, presence: true,
    uniqueness: { scope: :organization_id },
    length: { maximum: 30 }

  validates :status, presence: true
  validates :slug, presence: true, uniqueness: { scope: :organization_id }

  before_validation :generate_slug, on: :create
  def clone_with_questions!
    cloned_quiz = deep_clone include: { questions: :options }

    new_name = generate_unique_name(name)

    cloned_quiz.name = new_name
    cloned_quiz.slug = generate_unique_slug(new_name)
    cloned_quiz.status = "draft"
    cloned_quiz.category_id = category_id
    cloned_quiz.organization_id = organization_id

    cloned_quiz.save!
    cloned_quiz
  end

  private

    def generate_unique_name(base_name)
      name = base_name
      counter = 2

      while Quiz.exists?(organization_id: organization_id, name: name)
        name = "#{base_name} #{counter}"
        counter += 1
      end

      name
    end

    def generate_unique_slug(name)
      base_slug = name.parameterize
      slug = base_slug
      counter = 2

      while Quiz.exists?(organization_id: organization_id, slug: slug)
        slug = "#{base_slug}-#{counter}"
        counter += 1
      end

      slug
    end

    def generate_slug
      return unless name.present?

      self.slug ||= generate_unique_slug(name)
    end
end
