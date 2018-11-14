class ProductsController < ApplicationController

  def index
    @products = Product.order('created_at DESC')
    render json: @products
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      render json: @product
    else
      render json: {}, status: 401
    end
  end

  def update
    if current_product.update(product_params)
      render json: current_product
    else
      render json: {}, status: 401
    end
  end

  def destroy
    current_product.destroy
    head :no_content
  end

  private
    def current_product
      @product = Product.find(params[:id])
    end

    def product_params
      params.require(:product).permit(:name, :description, :price)
    end
end
