# frozen_string_literal: true

FactoryBot.define do
  factory :submission_answer do
    submission { "" }
    question { "" }
    selected_option { "" }
    is_correct { false }
  end
end
