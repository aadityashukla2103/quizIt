# frozen_string_literal: true

class Redirection < ApplicationRecord
  belongs_to :organization

  validates :from_path, presence: true, uniqueness: { scope: :organization_id }
  validates :to_path, presence: true

  validate :from_and_to_not_same
  validate :prevent_cyclic_redirect

  before_validation :normalize_from_path
  before_validation :normalize_to_path

  private

    def normalize_from_path
      return if from_path.blank?

      value = from_path.strip

      value = value.gsub(/\s+/, "")
      value = value.sub(/\A\//, "") if value.start_with?("/http://", "/https://")

      if value.start_with?("http://", "https://")
        uri = URI.parse(value)
        self.from_path = uri.path.presence || "/"
        return
      end

      self.from_path = value.start_with?("/") ? value : "/#{value}"
   end

    def normalize_to_path
      return if to_path.blank?

      value = to_path.strip

      is_full_url =
        value.start_with?("http://", "https://") ||
        value.match?(/\A[a-z0-9-]+\./i)

      if is_full_url
        self.to_path = value
        return
      end

      self.to_path = "/#{value}" unless value.start_with?("/")
    end

    def from_and_to_not_same
      errors.add(:base, "From path and To path cannot be same") if from_path == to_path
    end

    def prevent_cyclic_redirect
      existing = Redirection.find_by(from_path: to_path, organization_id: organization_id)
      errors.add(:base, "Cyclic redirection not allowed") if existing&.to_path == from_path
    end
end
