# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz

  validates :content, presence: true
  validates :position, numericality: { only_integer: true }, allow_nil: true
end
