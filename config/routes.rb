Rails.application.routes.draw do
  resources :stops
  resources :trips

  root to: "trips#index"
end
