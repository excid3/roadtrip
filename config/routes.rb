Rails.application.routes.draw do
  devise_for :users

  resources :trips do
    resources :stops
  end

  get "offline", to: "main#offline"

  root to: "trips#index"
end
