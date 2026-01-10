# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    from_path { "/old-path" }
    to_path { "/new-path" }

  end
end
