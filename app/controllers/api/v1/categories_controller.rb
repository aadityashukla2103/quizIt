# frozen_string_literal: true

class Api::V1::CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :update, :destroy]

  def index
    result = Categories::IndexService.new.call
    render json: result, include: :quizzes
  end

  def show
    result = Categories::ShowService.new(@category.id).call
    render json: result
  end

  def create
    result = Categories::CreateService.new(category_params).call
    render json: result
  end

  def update
    result = Categories::UpdateService.new(@category, category_params).call
    render json: result
  end

  def destroy
    result = Categories::DestroyService.new(@category).call
    render json: result
  end

  def reorder
    params[:category_ids].each_with_index do |id, index|
      Category.find(id).set_list_position(index + 1)
    end

    head :ok
  end

  private

    def set_category
      @category = Category.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:name)
    end
end
