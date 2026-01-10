# frozen_string_literal: true

class Api::V1::CategoriesController < Api::V1::BaseController
  before_action :set_category, only: [:show, :update, :destroy]

  def index
    result = Categories::IndexService.new.call
    render_json(result[:data], result[:status])
  end

  def show
    result = Categories::ShowService.new(@category.id).call
    render_json(result[:data], result[:status])
  end

  def create
    result = Categories::CreateService.new(category_params).call

    if result[:success]
      render_message(result[:message], result[:status], result[:data])
    else
      render_error(result[:data][:errors], result[:status])
    end
  end

  def update
    result = Categories::UpdateService.new(@category, category_params).call

    if result[:success]
      render_message(result[:message], result[:status], result[:data])
    else
      render_error(result[:data][:errors], result[:status])
    end
  end

  def destroy
    result = Categories::DestroyService.new(@category).call
    render_message(result[:message], result[:status], result[:data])
  end

  def reorder
    params[:category_ids].each_with_index do |id, index|
      Category.find(id).set_list_position(index + 1)
    end

    render_message("Categories reordered successfully", :ok)
  end

  private

    def set_category
      @category = Category.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:name)
    end
end
