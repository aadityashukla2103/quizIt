# frozen_string_literal: true

require "test_helper"

class Api::V1::SubmissionAnswersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    sign_in @user
    @headers = headers(@user)

    @quiz = create(:quiz, organization: @user.organization)
    @submission = create(:submission, quiz: @quiz, user: @user)
    @question = create(:question, quiz: @quiz)
    @option = create(:option, question: @question)

    @submission_answer = create(
      :submission_answer,
      submission: @submission,
      question: @question,
      selected_option: @option
    )
  end

  def test_list_all_submission_answers
    get api_v1_submission_answers_path, headers: @headers

    assert_response :success
    assert_kind_of Array, response_body
  end

  def test_create_submission_answer
    payload = {
      submission_answer: {
        submission_id: @submission.id,
        question_id: @question.id,
        selected_option_id: @option.id,
        is_correct: false
      }
    }

    assert_difference "SubmissionAnswer.count", 1 do
      post api_v1_submission_answers_path,
        params: payload,
        headers: @headers
    end

    assert_response :success
  end

  def test_update_submission_answer
    payload = {
      submission_answer: {
        selected_option_id: @option.id,
        is_correct: true
      }
    }

    patch api_v1_submission_answer_path(@submission_answer),
      params: payload,
      headers: @headers

    assert_response :success
    assert_equal true, @submission_answer.reload.is_correct
  end

  def test_delete_submission_answer
    assert_difference "SubmissionAnswer.count", -1 do
      delete api_v1_submission_answer_path(@submission_answer),
        headers: @headers
    end

    assert_response :success
  end
end
