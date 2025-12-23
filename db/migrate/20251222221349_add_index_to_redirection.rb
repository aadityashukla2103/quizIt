# frozen_string_literal: true

class AddIndexToRedirection < ActiveRecord::Migration[7.1]
  def change
    add_index :redirections, :from_path, unique: true
  end
end
