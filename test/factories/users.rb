# frozen_string_literal: true

FactoryBot.define do
  factory :user do

    association :organization
    email { Faker::Internet.email }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    password { "welcome" }
    password_confirmation { "welcome" }

    trait :admin do
      role { "admin" }
    end
  end
end
