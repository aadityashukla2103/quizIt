# frozen_string_literal: true

require "test_helper"

class Api::V1::QuizzesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin = create :user, :admin
    sign_in @admin
    @headers = headers(@admin)

    @quizzes = create_list(:quiz, 3)
  end

  def test_list_all_quizzes
    get api_v1_quizzes_url, headers: @headers

    assert_response :success
    quiz = response_body.first
    expected_keys = %w[id name status created_at updated_at organization_id category_id]
    assert_equal expected_keys.sort, quiz.keys.sort
  end

  def test_show_single_quiz
    quiz = @quizzes.first
    get api_v1_quiz_url(quiz), headers: @headers

    assert_response :success
    assert_equal quiz.id, response_body["id"]
  end

  def test_create_a_valid_quiz
    payload = {
      quiz: {
        name: "Sample Quiz",
        status: "draft",
        organization_id: nil,
        category_id: nil
      }
    }

    assert_difference "Quiz.count", 1 do
      post api_v1_quizzes_url, params: payload, headers: @headers
    end

    assert_response :created
    assert_equal "Sample Quiz", response_body["name"]
  end

  def test_create_quiz_with_blank_name
    payload = { quiz: { name: "", status: "draft" } }

    assert_no_difference "Quiz.count" do
      post api_v1_quizzes_url, params: payload, headers: @headers
    end

    assert_response :unprocessable_entity
    assert_includes response_body["errors"].join, "Name can't be blank"
  end

  def test_delete_a_quiz
    quiz = @quizzes.first

    assert_difference "Quiz.count", -1 do
      delete api_v1_quiz_url(quiz), headers: @headers
    end

    assert_response :no_content
  end
end
