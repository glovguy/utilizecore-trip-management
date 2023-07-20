Rails.application.routes.draw do
  root 'trips_dashboard#index'
  get '/login', to: 'sessions#index', as: 'login'
  resources :trips, only: [:index, :create]
  resources :users, only: [:index]
end
