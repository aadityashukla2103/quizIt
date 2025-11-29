# frozen_string_literal: true

require "test_helper"

class Api::V1::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin = create(:user, :admin)
    sign_in @admin
    @headers = headers(@admin)

    @category = create(:category)
  end

  def test_list_categories
    get api_v1_categories_url, headers: @headers

    assert_response :success
    assert_kind_of Array, response_body
  end

  def test_show_category
    get api_v1_category_url(@category), headers: @headers

    assert_response :success
    assert_equal @category.id, response_body["id"]
  end

  def test_create_valid_category
    payload = {
      category: {
        name: "New Category"
      }
    }

    assert_difference "Category.count", 1 do
      post api_v1_categories_url, params: payload, headers: @headers
    end

    assert_response :created
    assert_equal "New Category", response_body["name"]
  end

  def test_create_invalid_category
    payload = {
      category: { name: "" }
    }

    assert_no_difference "Category.count" do
      post api_v1_categories_url, params: payload, headers: @headers
    end

    assert_response :unprocessable_entity
    assert_includes response_body["errors"].join, "Name can't be blank"
  end

  def test_update_valid_category
    payload = {
      category: { name: "Updated Name" }
    }

    patch api_v1_category_url(@category), params: payload, headers: @headers

    assert_response :success
    assert_equal "Updated Name", response_body["name"]
  end

  def test_update_invalid_category
    payload = {
      category: { name: "" }
    }

    patch api_v1_category_url(@category), params: payload, headers: @headers

    assert_response :unprocessable_entity
    assert_includes response_body["errors"].join, "Name can't be blank"
  end

  def test_destroy_category
    assert_difference "Category.count", -1 do
      delete api_v1_category_url(@category), headers: @headers
    end

    assert_response :no_content
  end
end
