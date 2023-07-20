require "test_helper"

class TripsDashboardControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get trips_dashboard_index_url
    assert_response :success
  end
end
