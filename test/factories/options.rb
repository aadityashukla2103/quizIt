# frozen_string_literal: true

FactoryBot.define do
  factory :option do
    association :question
    content { Faker::Lorem.sentence }
    is_correct { Faker::Boolean.boolean }
  end
end
