class ApplicationController < ActionController::Base
  before_action :validate_session
  attr_reader :current_user

  def validate_session
    redirect_to(login_path) unless session[:user_id]
    @current_user = User.find_by_id(session[:user_id])
  end
end
