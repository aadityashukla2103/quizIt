# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# Create one organization
org = Organization.create!(
  name: "Main Organization"
)

# Create one category
cat = Category.create!(
  name: "General Category"
)

# Create 15 quizzes
15.times do |i|
  Quiz.create!(
    name: "Quiz #{i + 1}",
    status: 0,
    organization_id: org.id,
    category_id: cat.id
  )
end

puts "✔ 15 quizzes created!"
