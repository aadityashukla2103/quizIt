# frozen_string_literal: true

class Quiz < ApplicationRecord
  enum status: { draft: 0, published: 1 }
  belongs_to :category
  has_many :submissions, dependent: :destroy
  has_many :questions, dependent: :destroy
  belongs_to :organization

  validates :name, presence: true
  validates :status, presence: true
end
