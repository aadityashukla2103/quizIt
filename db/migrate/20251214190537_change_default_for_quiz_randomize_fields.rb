# frozen_string_literal: true

class ChangeDefaultForQuizRandomizeFields < ActiveRecord::Migration[7.1]
  def change
    change_column_default :quizzes, :randomize_questions, true
    change_column_default :quizzes, :randomize_options, true
  end
end
