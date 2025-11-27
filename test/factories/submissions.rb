# frozen_string_literal: true

FactoryBot.define do
  factory :submission do
    association :user
    association :quiz

    correct_answers { Faker::Number }
    wrong_answers { Faker::Number }
    total_questions { Faker::Number }
    status { :completed }
    submitted_at { Faker::Time.backward(days: 3) }
  end
end
