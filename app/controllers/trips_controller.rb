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
    @trip = Trip.find(params[:id])
    update_assignee if trip_edit_params[:assignee_id]
    update_status if trip_edit_params[:status]
    if @trip.save
      render json: @trip
    else
      render json: @trip.errors, status: 422
    end
  end

  private

  def update_assignee
    @trip.update(assignee_id: trip_edit_params[:assignee_id])
  end

  def update_status
    if @trip.status == "not_started" && trip_edit_params[:status] == "in_progress"
      @trip.status = "in_progress"
      @trip.start_time = Time.now
    elsif @trip.status == "in_progress" && trip_edit_params[:status] == "completed"
      @trip.status = "completed"
      @trip.end_time = Time.now
    elsif @trip.status == "overdue" && trip_edit_params[:status] == "completed"
      @trip.status = "completed"
      @trip.end_time = Time.now
    else
      throw "Invalid status transition"
    end
  end

  def trip_create_params
    params.require(:trip).permit(:assignee_id, :owner_id, :address, :eta, :etc)
  end

  def trip_edit_params
    params.require(:trip).permit(:assignee_id, :status)
  end
end
