# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @question = create(:question)
  end

  def test_question_is_valid
    assert @question.valid?
  end

  def test_content_should_be_present
    @question.content = ""
    assert_not @question.valid?
    assert_includes @question.errors[:content], "can't be blank"
  end

  def test_question_belongs_to_quiz
    assert_instance_of Quiz, @question.quiz
  end

  def test_position_can_be_nil
    @question.position = nil
    assert @question.valid?
  end

  def test_question_has_many_options
    assert_respond_to @question, :options
  end

  def test_question_has_many_submission_answers
    assert_respond_to @question, :submission_answers
  end
end
