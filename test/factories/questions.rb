# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    quiz { nil }
    content { "MyText" }
    position { 1 }
  end
end
