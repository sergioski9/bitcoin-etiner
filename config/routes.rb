Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root 'cryptos#index'
  get 'cryptos/:hash', to: 'cryptos#show'
  post 'cryptos', to: 'cryptos#create'
  delete 'cryptos/:hash', to: 'cryptos#destroy'
  # Defines the root path route ("/")
  # root "articles#index"
end
