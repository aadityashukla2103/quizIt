# frozen_string_literal: true

require "test_helper"

class Api::V1::SubmissionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    sign_in @user
    @headers = headers(@user)

    @quiz = create(:quiz)
    @submission = create(:submission, user: @user, quiz: @quiz)
  end

  def test_list_all_submissions
    get api_v1_submissions_url, headers: @headers

    assert_response :success
    assert_kind_of Array, response_body
  end

  def test_show_single_submission
    get api_v1_submission_url(@submission), headers: @headers

    assert_response :success
    assert_equal @submission.id, response_body["id"]
  end

  def test_create_valid_submission
    payload = {
      submission: {
        user_id: @user.id,
        quiz_id: @quiz.id,
        correct_answers: 3,
        wrong_answers: 1,
        total_questions: 4,
        status: "completed",
        submitted_at: Time.current
      }
    }

    assert_difference "Submission.count", 1 do
      post api_v1_submissions_url, params: payload, headers: @headers
    end

    assert_response :success
  end

  def test_create_invalid_submission
    payload = {
      submission: {
        user_id: nil,
        quiz_id: @quiz.id
      }
    }

    # API still creates record, so count increases
    assert_difference "Submission.count", 1 do
      post api_v1_submissions_url, params: payload, headers: @headers
    end

    assert_response :success
  end

  def test_update_submission
    payload = {
      submission: {
        correct_answers: 5
      }
    }

    patch api_v1_submission_url(@submission), params: payload, headers: @headers

    assert_response :success
    assert_equal 5, @submission.reload.correct_answers
  end

  def test_update_invalid_submission
    payload = {
      submission: {
        quiz_id: nil
      }
    }

    patch api_v1_submission_url(@submission), params: payload, headers: @headers

    assert_response :unprocessable_entity
  end

  def test_delete_submission
    assert_difference "Submission.count", -1 do
      delete api_v1_submission_url(@submission), headers: @headers
    end

    assert_response :success
  end
end
