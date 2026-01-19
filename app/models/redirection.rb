# frozen_string_literal: true

class Redirection < ApplicationRecord
  belongs_to :organization
  validates :from_path, presence: true, uniqueness: true
  validates :to_path, presence: true
  validate :from_and_to_not_same
  validate :prevent_cyclic_redirect
  before_validation :add_prefix_to_from_path
  before_validation :handle_to_path

  private

    def add_prefix_to_from_path
      return if from_path.blank?

      self.from_path = "/#{from_path}" unless from_path.start_with?("/")
    end

    def handle_to_path
      return if to_path.blank?

      is_full_url =
        to_path.start_with?("http://", "https://") ||
        to_path.match?(/\A[a-z0-9-]+\./i)

      return if is_full_url

      self.to_path = "/#{to_path}" unless to_path.start_with?("/")
    end

    def from_and_to_not_same
      errors.add(:base, "From path and To path cannot be same") if from_path == to_path
    end

    def prevent_cyclic_redirect
      existing = Redirection.find_by(from_path: to_path)
      if existing&.to_path == from_path
        errors.add(:base, "Cyclic redirection not allowed")
      end
    end
end
