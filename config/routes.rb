Rails.application.routes.draw do
  root 'trips_dashboard#index'
  get '/login', to: 'sessions#index', as: 'login'
  resources :trips, only: [:index, :create, :update]
  resources :users, only: [:index]
end
