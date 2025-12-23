# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    from_path { "MyString" }
    to_path { "MyString" }
  end
end
