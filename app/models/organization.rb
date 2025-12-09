# frozen_string_literal: true

class Organization < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :quizzes, dependent: :destroy

  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
