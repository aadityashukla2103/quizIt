# frozen_string_literal: true

class CreateOptions < ActiveRecord::Migration[7.1]
  def change
    create_table :options, id: :uuid do |t|
      t.uuid :question
      t.string :content
      t.boolean :is_correct

      t.timestamps
    end
  end
end
