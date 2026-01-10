# frozen_string_literal: true

require "test_helper"

class Api::V1::OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin = create(:user, :admin)
    sign_in @admin
    @headers = headers(@admin)
    @organization = create(:organization)
  end

  def test_list_organizations
    get api_v1_organizations_url, headers: @headers

    assert_response :success
    assert_kind_of Array, response_body["organizations"]
  end

  def test_show_organization
    get api_v1_organization_url(@organization), headers: @headers

    assert_response :success
    assert_equal @organization.id, response_body["organization"]["id"]
  end

  def test_create_organization
    payload = {
      organization: {
        name: "New Org"
      }
    }

    assert_difference "Organization.count", 1 do
      post api_v1_organizations_url,
        params: payload,
        headers: @headers
    end

    assert_response :created
    assert_equal "New Org", response_body["organization"]["name"]
  end

  def test_update_organization
    payload = {
      organization: {
        name: "Updated Org"
      }
    }

    patch api_v1_organization_url(@organization),
      params: payload,
      headers: @headers

    assert_response :ok
    assert_equal "Updated Org", response_body["organization"]["name"]
  end

  def test_destroy_organization
    assert_difference "Organization.count", -1 do
      delete api_v1_organization_url(@organization), headers: @headers
    end

    assert_response :no_content
  end
end
