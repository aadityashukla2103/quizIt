# frozen_string_literal: true

class AddSlugToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_column :quizzes, :slug, :string
    add_index :quizzes, :slug, unique: true
  end
end
