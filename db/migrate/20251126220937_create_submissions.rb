# frozen_string_literal: true

class CreateSubmissions < ActiveRecord::Migration[7.1]
  def change
    create_table :submissions, id: :uuid do |t|
      t.uuid :user_id
      t.uuid :quiz_id
      t.integer :correct_answers
      t.integer :wrong_answers
      t.integer :total_questions
      t.integer :status
      t.datetime :submitted_at

      t.timestamps
    end
  end
end
