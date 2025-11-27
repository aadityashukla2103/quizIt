# frozen_string_literal: true

FactoryBot.define do
  factory :submission_answer do
    association :submission
    association :question
    association :selected_option, factory: :option
    is_correct { Faker::Boolean.boolean }
  end
end
