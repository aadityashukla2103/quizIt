# frozen_string_literal: true

require "test_helper"

class SubmissionTest < ActiveSupport::TestCase
  def setup
    @submission = build(:submission)
  end

  def test_valid_submission
    assert @submission.valid?
  end

  def test_user_can_be_nil
    @submission.user = nil
    assert @submission.valid?
  end

  def test_quiz_presence
    @submission.quiz = nil
    assert_not @submission.valid?
    assert_includes @submission.errors[:quiz], "must exist"
  end

  def test_status_enum_values
    assert Submission.statuses.key?("incomplete")
    assert Submission.statuses.key?("completed")
  end

  def test_submission_answers_association
    submission = create(:submission)
    create_list(:submission_answer, 3, submission: submission)

    assert_equal 3, submission.submission_answers.count
  end

  def test_dependent_destroy_submission_answers
    submission = create(:submission)
    create_list(:submission_answer, 2, submission: submission)

    assert_difference "SubmissionAnswer.count", -2 do
      submission.destroy
    end
  end

  def test_correct_answers_can_be_nil
    @submission.correct_answers = nil
    assert @submission.valid?
  end

  def test_wrong_answers_can_be_nil
    @submission.wrong_answers = nil
    assert @submission.valid?
  end

  def test_total_questions_can_be_nil
    @submission.total_questions = nil
    assert @submission.valid?
  end
end
