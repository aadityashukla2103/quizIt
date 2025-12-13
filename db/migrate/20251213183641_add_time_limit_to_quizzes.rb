# frozen_string_literal: true

class AddTimeLimitToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_column :quizzes, :time_limit, :integer
  end
end
