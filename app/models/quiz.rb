# frozen_string_literal: true

class Quiz < ApplicationRecord
  enum status: { draft: 0, published: 1 }
  belongs_to :category

  validates :name, presence: true
  validates :status, presence: true
end
