Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :payments, only: [:index, :show, :create, :update]
      post 'payments/:id/refund', to: 'payments#refund'
      get 'payments/stats', to: 'payments#stats'
    end
  end
  
  get 'health', to: 'health#check'
end
