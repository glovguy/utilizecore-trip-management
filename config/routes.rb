Rails.application.routes.draw do
  root 'sessions#index'
  get '/login', to: 'sessions#index', as: 'login'
end
