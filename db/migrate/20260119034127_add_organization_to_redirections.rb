# frozen_string_literal: true

class AddOrganizationToRedirections < ActiveRecord::Migration[7.1]
  def change
    add_reference :redirections, :organization, null: false, foreign_key: true, type: :uuid
  end
end
