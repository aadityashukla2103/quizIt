# frozen_string_literal: true

require "test_helper"

class Api::V1::QuizzesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin = create(:user, :admin)
    @user = create(:user)

    sign_in @admin
    @headers_admin = headers(@admin)
    @headers_user = headers(@user)

    @category = create(:category)
    @organization = @admin.organization
    @quizzes = create_list(:quiz, 3, organization: @organization, category: @category)
  end

  def test_list_all_quizzes
    get api_v1_quizzes_url, headers: @headers_admin
    assert_response :success

    quiz = response_body.first
    expected_keys = %w[id name status created_at updated_at organization_id category_id]
    assert_equal expected_keys.sort, quiz.keys.sort
  end

  def test_show_single_quiz
    quiz = @quizzes.first
    get api_v1_quiz_url(quiz), headers: @headers_admin

    assert_response :success
    assert_equal quiz.id, response_body["id"]
  end

  def test_show_non_existent_quiz
    get api_v1_quiz_url(id: "invalid"), headers: @headers_admin
    assert_response :not_found
  end

  #
  # CREATE
  #
  def test_admin_can_create_quiz
    payload = {
      quiz: {
        name: "Sample Quiz",
        status: "draft",
        organization_id: @organization.id,
        category_id: @category.id
      }
    }

    assert_difference "Quiz.count", 1 do
      post api_v1_quizzes_url, params: payload, headers: @headers_admin
    end

    assert_response :created
    assert_equal "Sample Quiz", response_body["name"]
  end

  def test_create_quiz_with_blank_name
    payload = {
      quiz: {
        name: "",
        status: "draft",
        organization_id: @organization.id,
        category_id: @category.id
      }
    }

    assert_no_difference "Quiz.count" do
      post api_v1_quizzes_url, params: payload, headers: @headers_admin
    end

    assert_response :unprocessable_entity
    assert_includes response_body["errors"].join, "Name can't be blank"
  end

  def test_non_admin_cannot_create_quiz
    payload = {
      quiz: {
        name: "Test Quiz",
        status: "draft",
        organization_id: @organization.id,
        category_id: @category.id
      }
    }

    assert_no_difference "Quiz.count" do
      post api_v1_quizzes_url, params: payload, headers: @headers_user
    end

    assert_response :forbidden
  end

  #
  # UPDATE
  #
  def test_admin_can_update_quiz
    quiz = @quizzes.first

    patch api_v1_quiz_url(quiz), params: { quiz: { name: "Updated Name" } }, headers: @headers_admin

    assert_response :success
    assert_equal "Updated Name", response_body["name"]
  end

  def test_update_quiz_with_blank_name
    quiz = @quizzes.first

    patch api_v1_quiz_url(quiz), params: { quiz: { name: "" } }, headers: @headers_admin

    assert_response :unprocessable_entity
    assert_includes response_body["errors"].join, "Name can't be blank"
  end

  def test_update_non_existent_quiz
    patch api_v1_quiz_url(id: "invalid"), params: { quiz: { name: "New" } }, headers: @headers_admin
    assert_response :not_found
  end

  def test_non_admin_cannot_update_quiz
    quiz = @quizzes.first

    patch api_v1_quiz_url(quiz), params: { quiz: { name: "Fail Update" } }, headers: @headers_user

    assert_response :forbidden
    quiz.reload
    refute_equal "Fail Update", quiz.name
  end

  def test_admin_can_delete_quiz
    quiz = @quizzes.first

    assert_difference "Quiz.count", -1 do
      delete api_v1_quiz_url(quiz), headers: @headers_admin
    end

    assert_response :no_content
  end

  def test_non_admin_cannot_delete_quiz
    quiz = @quizzes.first

    assert_no_difference "Quiz.count" do
      delete api_v1_quiz_url(quiz), headers: @headers_user
    end

    assert_response :forbidden
  end

  def test_delete_non_existent_quiz
    delete api_v1_quiz_url(id: "invalid"), headers: @headers_admin
    assert_response :not_found
  end
end
