# frozen_string_literal: true

require "test_helper"

class Api::V1::SubmissionAnswersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = create(:user)
    @submission = create(:submission)
    @question = create(:question)
    @option = create(:option, question: @question)

    @submission_answer = create(
      :submission_answer,
      submission: @submission,
      question: @question,
      selected_option: @option
    )

    @headers = headers(@user)
  end

  test "should list all submission answers" do
    get api_v1_submission_answers_path, headers: @headers
    assert_response :success
  end

  test "should create a submission answer" do
    data = {
      submission_answer: {
        submission_id: @submission.id,
        question_id: @question.id,
        selected_option_id: @option.id,
        is_correct: false
      }
    }

    assert_difference "SubmissionAnswer.count", 1 do
      post api_v1_submission_answers_path, params: data, headers: @headers
    end

    assert_response :success
  end

  test "should update a submission answer" do
    data = {
      submission_answer: {
        selected_option_id: @option.id,
        is_correct: true
      }
    }

    patch api_v1_submission_answer_path(@submission_answer),
      params: data, headers: @headers

    assert_response :success
    assert_equal true, @submission_answer.reload.is_correct
  end

  test "should delete a submission answer" do
    assert_difference "SubmissionAnswer.count", -1 do
      delete api_v1_submission_answer_path(@submission_answer),
        headers: @headers
    end

    assert_response :no_content
  end
end
