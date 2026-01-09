# frozen_string_literal: true

namespace :api, defaults: { format: :json } do
  namespace :v1 do
    devise_scope :user do
      post "login", to: "sessions#create", as: "login"
      delete "logout", to: "sessions#destroy", as: "logout"
    end

    get "users/me", to: "users#me"

    resources :users, only: [:show, :create, :update, :destroy], constraints: { id: /.*/ }

    post "guest_registrations", to: "guest_registrations#create"
    resources :redirections, only: [:index, :create, :update, :destroy]
    resources :cypress_runs, only: [:create]

    resources :quizzes, param: :slug, only: [:index, :show, :create, :update, :destroy] do
      resources :submissions, only: [:index]
      member do
       get :quiz_submissions
     end

      member do
        post :clone
        resource :report, only: [:create], module: :quizzes do
          get :download, on: :member
        end
      end

      collection do
        put :bulk_update
        delete :bulk_delete
      end

      resources :questions, only: [:index, :show, :create, :update, :destroy] do
        member do
          post :clone
        end
        resources :options, only: [:index, :show, :create, :update, :destroy]
      end
    end

    namespace :public do
      resources :quizzes, only: [:index, :show]
    end

    resources :organizations, only: [:index, :show, :create, :update, :destroy]

    resources :categories, only: [:index, :show, :create, :update, :destroy] do
      patch :reorder, on: :collection
    end

    resources :submissions, only: [:index, :show, :create, :update, :destroy] do
      member do
        post :finalize
      end
      collection do
        get :quiz_submissions
      end
    end

    resources :submission_answers, only: [:index, :show, :create, :update, :destroy]
  end
end
