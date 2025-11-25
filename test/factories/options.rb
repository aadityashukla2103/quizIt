# frozen_string_literal: true

FactoryBot.define do
  factory :option do
    question { "" }
    content { "MyString" }
    is_correct { false }
  end
end
