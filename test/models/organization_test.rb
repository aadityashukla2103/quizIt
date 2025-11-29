# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = build(:organization)
  end

  def test_valid_organization
    assert @organization.valid?
  end

  def test_name_presence
    @organization.name = nil
    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages, "Name can't be blank"
  end

  def test_association_with_users
    organization = create(:organization)
    create_list(:user, 2, organization: organization)

    assert_equal 2, organization.users.count
  end

  def test_association_with_quizzes
    organization = create(:organization)
    create_list(:quiz, 3, organization: organization)

    assert_equal 3, organization.quizzes.count
  end

  def test_dependent_destroy_users
    organization = create(:organization)
    create_list(:user, 2, organization: organization)

    assert_difference "User.count", -2 do
      organization.destroy
    end
  end

  def test_dependent_destroy_quizzes
    organization = create(:organization)
    create_list(:quiz, 2, organization: organization)

    assert_difference "Quiz.count", -2 do
      organization.destroy
    end
  end
end
