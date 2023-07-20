class TripsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Trip.all
  end

  def create
    trip = Trip.new(trip_create_params)
    if trip.save
      render json: trip
    else
      render json: trip.errors, status: 422
    end
  end

  private

  def trip_create_params
    params.require(:trip).permit(:assignee_id, :owner_id, :address, :eta, :etc)
  end
end
