# frozen_string_literal: true

class AddUniqueIndexToOptions < ActiveRecord::Migration[7.1]
  def change
    add_index :options, [:question_id, :content], unique: true
  end
end
