# frozen_string_literal: true

require "test_helper"

class Api::V1::QuestionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin = create(:user, :admin)
    sign_in @admin
    @headers = headers(@admin)

    @quiz = create(:quiz, organization: @admin.organization)
    @question = create(:question, quiz: @quiz)
  end

  def test_list_all_questions
    get api_v1_quiz_questions_url(@quiz), headers: @headers
    assert_response :success

    body = JSON.parse(response.body)["notice"]
    assert_equal "Questions fetched successfully", body["message"]
    assert_equal "ok", body["status"]
    assert_kind_of Array, body["data"]

    first_question = body["data"].first
    refute_nil first_question
    expected_keys = %w[id content position quiz_id created_at updated_at options]
    assert_equal expected_keys.sort, first_question.keys.sort
  end

  def test_show_single_question
    get api_v1_quiz_question_url(@quiz, @question), headers: @headers
    assert_response :success

    body = JSON.parse(response.body)["notice"]
    assert_equal "Question fetched successfully", body["message"]
    assert_equal @question.id, body["data"]["id"]
    assert_kind_of Array, body["data"]["options"]
  end

  def test_create_question
    payload = { question: { content: "What is Ruby?", position: 1 } }

    assert_difference "Question.count", 1 do
      post api_v1_quiz_questions_url(@quiz), params: payload, headers: @headers
    end

    body = JSON.parse(response.body)["notice"]
    assert_response :success
    assert_equal "Question created successfully", body["message"]
    question_data = body["data"]["question"]
    assert_equal "What is Ruby?", question_data["content"]
  end

  def test_create_question_with_blank_content
    payload = { question: { content: "", position: 1 } }

    assert_no_difference "Question.count" do
      post api_v1_quiz_questions_url(@quiz), params: payload, headers: @headers
    end

    body = JSON.parse(response.body)["notice"]
    assert_response :success
    assert_equal "Validation failed", body["message"]
    assert_includes body["data"]["errors"].join, "Content can't be blank"
  end

  def test_update_question
    payload = { question: { content: "Updated content" } }

    patch api_v1_quiz_question_url(@quiz, @question), params: payload, headers: @headers

    body = JSON.parse(response.body)["notice"]
    assert_response :success
    assert_equal "Question updated successfully", body["message"]
    assert_equal "Updated content", body["data"]["content"]
  end

  def test_delete_question
    assert_difference "Question.count", -1 do
      delete api_v1_quiz_question_url(@quiz, @question), headers: @headers
    end

    body = JSON.parse(response.body)["notice"]
    assert_response :success
    assert_equal "Question deleted successfully", body["message"]
    assert_equal({}, body["data"])
  end

  def test_clone_question
    post clone_api_v1_quiz_question_url(@quiz, @question), headers: @headers

    body = JSON.parse(response.body)["notice"]
    assert_response :success
    assert_equal "Question cloned successfully", body["message"]

    cloned_content = body["data"]["content"]
    assert_includes cloned_content, @question.content
  end
end
