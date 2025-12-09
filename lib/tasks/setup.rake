# frozen_string_literal: true

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["reset_and_populate_sample_data"].invoke if Rails.env.development?
end

desc "Populates sample data without resetting the database first"
task populate_sample_data: [:environment] do
  create_sample_data!
  puts "sample data has been added."
end

desc "Populates sample data without after resetting the database"
task reset_and_populate_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data"
  elsif Rails.env.staging?
    puts "Skipping deleting and populating sample data"
  else
    delete_all_records_from_all_tables
    Rake::Task["populate_sample_data"].invoke
  end
end

#
# DO NOT CHANGE ANYTHING IN THIS METHOD
# This is last layer of defense against deleting data in production
# If you need to delete data in staging or in production
# please execute the command manually and do not change this method
#
def delete_all_records_from_all_tables
  if Rails.env.production?
    raise "deleting all records in production is not alllowed"
  else
    Rake::Task["db:schema:load"].invoke
  end
end

def create_sample_data!
  organization = Organization.find_or_create_by!(name: "Acme Inc")
  seed_categories!
  create_user! email: "oliver@example.com", organization: organization
end

def create_user!(options = {})
  user_attributes = {
    first_name: "Oliver",
    last_name: "Smith",
    password: "welcome",
    password_confirmation: "welcome",
    role: "admin"
  }
  attributes = user_attributes.merge options
  user = User.find_or_initialize_by(email: attributes[:email])
  user.assign_attributes(attributes)
  user.save!
end

def seed_categories!
  %w[General Technology Science Business Lifestyle].each do |name|
    Category.find_or_create_by!(name: name)
  end
end
