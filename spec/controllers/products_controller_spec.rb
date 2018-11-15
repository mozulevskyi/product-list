require 'spec_helper'

RSpec.describe ProductsController, type: :controller do
  let!(:product) { FactoryBot.create(:product, name: 'Hello') }

  describe 'GET list of all products' do
    it 'returns status code 200' do
      get :index
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expect(json.size).to eq(1)
    end
  end

  describe 'POST a new product' do
    it 'returns status code 200' do
      product_params = {name: 'Hello'}

      post :create, params: {product: product_params}
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expect(json['name']).to eq(product_params[:name])
    end
  end

  describe 'PUT update a current product' do
    it 'returns status code 200' do
      put :update, params: {id: product.id, product: {name: 'Hello hello'} }
      product.reload
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expect(json['id']).to eq(product.id)
    end
  end

  describe 'DELETE current product' do
    it 'returns status code 204' do
      delete :destroy, params: {id: product.id}
      expect(response).to have_http_status(204)
    end
  end

end
