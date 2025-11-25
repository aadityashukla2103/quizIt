# frozen_string_literal: true

FactoryBot.define do
  factory :quiz do
    name { "MyString" }
    status { 1 }
    organization_id { "" }
    category_id { "" }
  end
end
