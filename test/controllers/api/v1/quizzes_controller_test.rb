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

    quiz = response_body["quizzes"].first

    expected_keys = %w[
      id
      name
      slug
      status
      created_at
      updated_at
      organization_id
      organization_name
      category_id
      category_name
      creator_id
      question_count
      submission_count
      time_limit
      show_on_homepage
      randomize_questions
      randomize_options
      email_notifications
    ]

    assert_equal expected_keys.sort, quiz.keys.sort
  end

  def test_show_single_quiz
    quiz = @quizzes.first
    get api_v1_quiz_url(slug: quiz.slug), headers: @headers_admin

    assert_response :success
    assert_equal quiz.id, response_body["quiz"]["id"]
 end

  def test_show_non_existent_quiz
    get api_v1_quiz_url(slug: "invalid"), headers: @headers_admin
    assert_response :not_found
  end

  def test_admin_can_create_quiz
    payload = {
      quiz: {
        name: "Sample Quiz",
        status: "draft",
        category_id: @category.id
      }
    }

    assert_difference "Quiz.count", 1 do
      post api_v1_quizzes_url, params: payload, headers: @headers_admin
    end

    assert_response :created
    assert_equal "Sample Quiz", response_body["quiz"]["name"]
  end

  def test_create_quiz_with_blank_name
    payload = {
      quiz: {
        name: "",
        status: "draft",
        category_id: @category.id
      }
    }

    assert_no_difference "Quiz.count" do
      post api_v1_quizzes_url, params: payload, headers: @headers_admin
    end

    assert_response :unprocessable_entity
  end

  def test_non_admin_cannot_create_quiz
    payload = {
      quiz: {
        name: "Test Quiz",
        status: "draft",
        category_id: @category.id
      }
    }

    assert_no_difference "Quiz.count" do
      post api_v1_quizzes_url, params: payload, headers: @headers_user
    end

    assert_response :forbidden
  end

  def test_admin_can_update_quiz
    quiz = @quizzes.first

    patch api_v1_quiz_url(slug: quiz.slug),
      params: { quiz: { name: "Updated Name" } },
      headers: @headers_admin

    assert_response :success
    assert_equal "Updated Name", response_body["quiz"]["name"]
  end

  def test_update_quiz_with_blank_name
    quiz = @quizzes.first

    patch api_v1_quiz_url(slug: quiz.slug),
      params: { quiz: { name: "" } },
      headers: @headers_admin

    assert_response :unprocessable_entity
  end

  def test_update_non_existent_quiz
    patch api_v1_quiz_url(slug: "invalid"),
      params: { quiz: { name: "New" } },
      headers: @headers_admin

    assert_response :not_found
  end

  def test_non_admin_cannot_update_quiz
    quiz = @quizzes.first

    patch api_v1_quiz_url(slug: quiz.slug),
      params: { quiz: { name: "Fail Update" } },
      headers: @headers_user

    assert_response :forbidden
    quiz.reload
    refute_equal "Fail Update", quiz.name
  end

  def test_admin_can_delete_quiz
    quiz = @quizzes.first

    assert_difference "Quiz.count", -1 do
      delete api_v1_quiz_url(slug: quiz.slug), headers: @headers_admin
    end

    assert_response :success
  end

  def test_non_admin_cannot_delete_quiz
    quiz = @quizzes.first

    assert_no_difference "Quiz.count" do
      delete api_v1_quiz_url(slug: quiz.slug), headers: @headers_user
    end

    assert_response :forbidden
  end

  def test_delete_non_existent_quiz
    delete api_v1_quiz_url(slug: "invalid"), headers: @headers_admin
    assert_response :not_found
  end
end
