# frozen_string_literal: true

class AddTimingToSubmissions < ActiveRecord::Migration[7.1]
  def change
    add_column :submissions, :started_at, :datetime
  end
end
