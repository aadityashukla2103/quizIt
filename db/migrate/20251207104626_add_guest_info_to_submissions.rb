# frozen_string_literal: true

class AddGuestInfoToSubmissions < ActiveRecord::Migration[7.1]
  def change
    add_column :submissions, :guest_name, :string
    add_column :submissions, :guest_email, :string
  end
end
