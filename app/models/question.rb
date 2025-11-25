# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy

  validates :content, presence: true
  validates :position, numericality: { only_integer: true }, allow_nil: true
end
