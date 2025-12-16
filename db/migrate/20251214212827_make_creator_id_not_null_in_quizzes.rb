# frozen_string_literal: true

class MakeCreatorIdNotNullInQuizzes < ActiveRecord::Migration[7.1]
  def change
    change_column_null :quizzes, :creator_id, false
  end
end
