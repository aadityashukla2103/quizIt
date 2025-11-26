# frozen_string_literal: true

class FixQuestionColumnInOptions < ActiveRecord::Migration[7.1]
  def change
    rename_column :options, :question, :question_id
  end
end
