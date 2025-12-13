# frozen_string_literal: true

class AddShowOnHomepageToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_column :quizzes, :show_on_homepage, :boolean, default: false, null: false
  end
end
