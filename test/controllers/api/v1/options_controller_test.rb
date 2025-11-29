# frozen_string_literal: true

require "test_helper"

class Api::V1::OptionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin = create(:user, :admin)
    sign_in @admin
    @headers = headers(@admin)

    @quiz = create(:quiz, organization: @admin.organization)
    @question = create(:question, quiz: @quiz)
    @option = create(:option, question: @question)
  end

  def test_list_all_options
    get api_v1_quiz_question_options_url(@quiz, @question), headers: @headers

    assert_response :success
    first = response_body.first

    expected_keys = %w[id content is_correct question_id created_at updated_at]
    assert_equal expected_keys.sort, first.keys.sort
  end

  def test_show_single_option
    get api_v1_quiz_question_option_url(@quiz, @question, @option), headers: @headers

    assert_response :success
    assert_equal @option.id, response_body["id"]
  end

  def test_create_option
    payload = {
      option: {
        content: "Yes",
        is_correct: true
      }
    }

    assert_difference "Option.count", 1 do
      post api_v1_quiz_question_options_url(@quiz, @question),
        params: payload,
        headers: @headers
    end

    assert_response :created
    assert_equal "Yes", response_body["content"]
  end

  def test_create_option_invalid
    payload = {
      option: {
        content: "",
        is_correct: true
      }
    }

    assert_no_difference "Option.count" do
      post api_v1_quiz_question_options_url(@quiz, @question),
        params: payload,
        headers: @headers
    end

    assert_response :unprocessable_entity
    assert_includes response_body["errors"].join, "Content can't be blank"
  end

  def test_update_option
    payload = {
      option: {
        content: "New content"
      }
    }

    patch api_v1_quiz_question_option_url(@quiz, @question, @option),
      params: payload,
      headers: @headers

    assert_response :ok
    assert_equal "New content", @option.reload.content
  end

  def test_delete_option
    assert_difference "Option.count", -1 do
      delete api_v1_quiz_question_option_url(@quiz, @question, @option), headers: @headers
    end

    assert_response :no_content
  end
end
