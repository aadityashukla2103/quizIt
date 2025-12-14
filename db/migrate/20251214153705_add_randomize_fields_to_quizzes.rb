# frozen_string_literal: true

class AddRandomizeFieldsToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_column :quizzes, :randomize_questions, :boolean, default: false, null: false
    add_column :quizzes, :randomize_options, :boolean, default: false, null: false
  end
end
