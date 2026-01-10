# frozen_string_literal: true

FactoryBot.define do
  factory :quiz do
    name { Faker::Lorem.characters(number: 20) }
    status { :draft }
    association :organization
    association :category
    association :creator, factory: :user
  end
end
