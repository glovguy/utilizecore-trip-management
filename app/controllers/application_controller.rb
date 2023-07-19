class ApplicationController < ActionController::Base
  before_action :validate_session

  def validate_session
    redirect_to(login_path) unless session[:user_id]
  end
end
