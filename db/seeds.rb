# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
puts "Creating default organization..."
organization = Organization.find_or_create_by!(name: "Default Organization")
puts "Organization ready: #{organization.name}"

puts "Creating default user..."
User.find_or_create_by!(email: "oliver@example.com") do |u|
  u.password = "welcome"
  u.password_confirmation = "welcome"
  u.first_name = "Oliver"
  u.last_name = "Smith"
  u.role = "admin"
  u.organization = organization
end

puts "User created!"
