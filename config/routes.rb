Rails.application.routes.draw do
  devise_for :users
  resources :stops
  resources :trips

  root to: "trips#index"
end
