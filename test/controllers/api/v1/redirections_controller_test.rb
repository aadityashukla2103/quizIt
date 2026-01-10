# frozen_string_literal: true

require "test_helper"

class Api::V1::RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin = create(:user, :admin)
    @redirection = create(:redirection)
    @headers = headers(@admin)
  end

  def test_admin_should_get_redirections_list
    get api_v1_redirections_url, headers: @headers

    assert_response :success
    assert response_body.present?
  end

  def test_admin_should_create_redirection
    params = {
      redirection: {
        from_path: "/another-old-path",
        to_path: "/another-new-path"
      }
    }

    assert_difference("Redirection.count", 1) do
      post api_v1_redirections_url,
        params: params,
        headers: @headers
    end

    assert_response :success
  end

  def test_admin_should_update_redirection
    params = {
      redirection: {
        to_path: "/updated-path"
      }
    }

    patch api_v1_redirection_url(@redirection),
      params: params,
      headers: @headers

    assert_response :success
    assert_equal "/updated-path", @redirection.reload.to_path
  end

  def test_admin_should_delete_redirection
    assert_difference("Redirection.count", -1) do
      delete api_v1_redirection_url(@redirection),
        headers: @headers
    end

    assert_response :success
  end

  def test_should_not_allow_cyclic_redirection
    create(
      :redirection,
      from_path: "/a",
      to_path: "/b"
    )

    params = {
      redirection: {
        from_path: "/b",
        to_path: "/a"
      }
    }

    assert_no_difference("Redirection.count") do
      post api_v1_redirections_url,
        params: params,
        headers: @headers
    end

    assert_response :unprocessable_entity
end
end
