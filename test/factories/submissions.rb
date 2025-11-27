# frozen_string_literal: true

FactoryBot.define do
  factory :submission do
    user_id { "" }
    quiz_id { "" }
    correct_answers { 1 }
    wrong_answers { 1 }
    total_questions { 1 }
    status { 1 }
    submitted_at { "2025-11-27 03:39:37" }
  end
end
