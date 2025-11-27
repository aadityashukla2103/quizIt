# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    association :quiz
    content { Faker::Lorem.sentence }
    position { Faker::Number }
  end
end
