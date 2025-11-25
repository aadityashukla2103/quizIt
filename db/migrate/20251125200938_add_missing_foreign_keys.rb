# frozen_string_literal: true

class AddMissingForeignKeys < ActiveRecord::Migration[7.1]
  def change
    add_foreign_key :users, :organizations
    add_foreign_key :quizzes, :organizations
    add_foreign_key :quizzes, :categories
    add_foreign_key :options, :questions, column: :question_id
  end
end
