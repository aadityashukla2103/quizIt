# frozen_string_literal: true

require "test_helper"

class SubmissionAnswerTest < ActiveSupport::TestCase
  def setup
    @submission_answer = build(:submission_answer)
  end

  def test_valid_submission_answer
    assert @submission_answer.valid?
  end

  def test_submission_presence
    @submission_answer.submission = nil
    assert_not @submission_answer.valid?
    assert_includes @submission_answer.errors[:submission], "must exist"
  end

  def test_question_presence
    @submission_answer.question = nil
    assert_not @submission_answer.valid?
    assert_includes @submission_answer.errors[:question], "must exist"
  end

  def test_selected_option_presence
    @submission_answer.selected_option = nil
    assert_not @submission_answer.valid?
    assert_includes @submission_answer.errors[:selected_option], "must exist"
  end

  def test_is_correct_boolean
    @submission_answer.is_correct = nil
    assert_not @submission_answer.valid?
  end
end
