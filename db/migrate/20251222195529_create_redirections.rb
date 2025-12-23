# frozen_string_literal: true

class CreateRedirections < ActiveRecord::Migration[7.1]
  def change
    create_table :redirections, id: :uuid do |t|
      t.string :from_path
      t.string :to_path

      t.timestamps
    end
  end
end
