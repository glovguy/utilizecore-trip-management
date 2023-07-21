class TripsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Trip.all
  end

  def create
    trip = Trip.new(trip_create_params)
    trip.status = :not_started
    if trip.save
      render json: trip
    else
      render json: trip.errors, status: 422
    end
  end

  def update
    trip = Trip.find(params[:id])
    if trip.update(assignee_id: trip_create_params[:assignee_id])
      render json: trip
    else
      render json: trip.errors, status: 422
    end
  end

  private

  def trip_create_params
    params.require(:trip).permit(:assignee_id, :owner_id, :address, :eta, :etc)
  end

  def trip_edit_params
    params.require(:trip).permit(:assignee_id, :id)
  end
end
