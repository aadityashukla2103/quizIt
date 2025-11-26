# frozen_string_literal: true

namespace :api, defaults: { format: :json } do
  namespace :v1 do
   devise_scope :user do
     post "login", to: "sessions#create", as: "login"
     delete "logout", to: "sessions#destroy", as: "logout"
   end

   resources :users, only: [:show, :create, :update, :destroy], constraints: { id: /.*/ }
   resources :notes, only: [:index, :create, :update] do
     collection do
       post "bulk_destroy"
     end
   end

   resources :cypress_runs, only: [:create]

   resources :quizzes, only: [:index, :show, :create, :update, :destroy]
   resources :questions, only: [:index, :show, :create, :update, :destroy] do
    resources :options, only: [:index, :show, :create, :update, :destroy]
  end
   resources :organizations, only: [:index, :show, :create, :update, :destroy]
   resources :categories, only: [:index, :show, :create, :update, :destroy]
 end
end
