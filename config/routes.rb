Rails.application.routes.draw do
  root 'trips#index'
  get '/login', to: 'sessions#index', as: 'login'
end
