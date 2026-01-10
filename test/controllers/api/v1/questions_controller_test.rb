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
    get api_v1_quiz_questions_url(@quiz.slug), headers: @headers

    assert_response :success
    assert_kind_of Array, response_body

    first = response_body.first
    expected_keys = %w[id content position quiz_id created_at updated_at options]
    assert_equal expected_keys.sort, first.keys.sort
  end

  def test_show_single_question
    get api_v1_quiz_question_url(@quiz.slug, @question), headers: @headers

    assert_response :success
    assert_equal @question.id, response_body["id"]
    assert_kind_of Array, response_body["options"]
  end

  def test_create_question
    payload = { question: { content: "What is Ruby?" } }

    assert_difference "Question.count", 1 do
      post api_v1_quiz_questions_url(@quiz.slug),
        params: payload,
        headers: @headers
    end

    assert_response :created
    assert_equal "What is Ruby?", response_body["question"]["content"]
  end

  def test_create_question_with_blank_content
    payload = { question: { content: "" } }

    assert_no_difference "Question.count" do
      post api_v1_quiz_questions_url(@quiz.slug),
        params: payload,
        headers: @headers
    end

    assert_response :unprocessable_entity
  end

  def test_update_question
    payload = { question: { content: "Updated content" } }

    patch api_v1_quiz_question_url(@quiz.slug, @question),
      params: payload,
      headers: @headers

    assert_response :ok
    assert_equal "Updated content", response_body["content"]
  end

  def test_delete_question
    assert_difference "Question.count", -1 do
      delete api_v1_quiz_question_url(@quiz.slug, @question), headers: @headers
    end

    assert_response :ok
  end

  def test_clone_question
    post clone_api_v1_quiz_question_url(@quiz.slug, @question), headers: @headers

    assert_response :created
    assert_includes response_body["content"], @question.content
  end
end
