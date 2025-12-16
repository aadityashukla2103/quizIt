# frozen_string_literal: true

class AddCreatorIdToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_reference :quizzes,
      :creator,
      type: :uuid,
      foreign_key: { to_table: :users }
  end
end
