# frozen_string_literal: true

class CreateSubmissionAnswers < ActiveRecord::Migration[7.1]
  create_table :submission_answers, id: :uuid do |t|
  t.uuid :submission_id
  t.uuid :question_id
  t.uuid :selected_option_id
  t.boolean :is_correct

  t.timestamps
end
end
