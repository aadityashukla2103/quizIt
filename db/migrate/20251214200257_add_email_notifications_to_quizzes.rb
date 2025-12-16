# frozen_string_literal: true

class AddEmailNotificationsToQuizzes < ActiveRecord::Migration[7.1]
  def change
    add_column :quizzes, :email_notifications, :boolean, default: false, null: false
  end
end
