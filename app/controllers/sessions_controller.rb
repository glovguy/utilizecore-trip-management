class SessionsController < ApplicationController
  def index
    initialize_session if safe_params[:commit] == "Log In"
  end

  private

  def initialize_session
    user = User.find_or_create_by(email: safe_params[:email])
    session[:email] = params[:email]
    session[:user_id] = user.id
    if session[:user_id]
      redirect_to root_path
    else
      render :index
    end
  end

  def safe_params
    params.permit(:email, :commit)
  end
end
