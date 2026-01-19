# frozen_string_literal: true

class Organization < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :quizzes, dependent: :destroy
  has_many :redirections, dependent: :destroy
  validates :name, presence: true, uniqueness: { case_sensitive: false }
  before_create :set_slug

  def set_slug
    self.slug ||= name.parameterize
 end
end
