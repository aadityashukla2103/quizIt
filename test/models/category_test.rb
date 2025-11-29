# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = build(:category)
  end

  def test_valid_category
    assert @category.valid?
  end

  def test_name_presence
    @category.name = nil
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Name can't be blank"
  end

  def test_association_with_quizzes
    category = create(:category)
    create_list(:quiz, 2, category: category)

    assert_equal 2, category.quizzes.count
  end

  def test_dependent_destroy
    category = create(:category)
    create_list(:quiz, 2, category: category)

    assert_difference "Quiz.count", -2 do
      category.destroy
    end
  end
end
