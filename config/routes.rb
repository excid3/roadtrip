Rails.application.routes.draw do
  devise_for :users
  resources :trips do
    resources :stops
  end

  root to: "trips#index"
end
