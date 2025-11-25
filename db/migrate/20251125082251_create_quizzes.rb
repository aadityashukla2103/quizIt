# frozen_string_literal: true

class CreateQuizzes < ActiveRecord::Migration[7.1]
  def change
    create_table :quizzes, id: :uuid do |t|
      t.string :name
      t.integer :status, default: 0
      t.uuid :organization_id
      t.uuid :category_id

      t.timestamps
    end
  end
end
