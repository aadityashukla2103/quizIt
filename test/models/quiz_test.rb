# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @quiz = create(:quiz)
  end

  def test_quiz_is_valid
    assert @quiz.valid?
  end

  def test_name_should_be_present
    @quiz.name = ""
    assert_not @quiz.valid?
    assert_includes @quiz.errors[:name], "can't be blank"
  end

  def test_status_should_be_present
    @quiz.status = nil
    assert_not @quiz.valid?
    assert_includes @quiz.errors[:status], "can't be blank"
  end

  def test_default_status_from_factory
    assert_equal "draft", @quiz.status
  end

  def test_status_enum_values
    expected = { "draft" => 0, "published" => 1 }
    assert_equal expected, Quiz.statuses
  end

  def test_quiz_belongs_to_category
    assert_instance_of Category, @quiz.category
  end

  def test_quiz_belongs_to_organization
    assert_instance_of Organization, @quiz.organization
  end

  def test_quiz_has_many_questions
    assert_respond_to @quiz, :questions
  end

  def test_quiz_has_many_submissions
    assert_respond_to @quiz, :submissions
  end
end
