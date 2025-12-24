# frozen_string_literal: true

class Api::V1::CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :update, :destroy]

  def index
    result = Categories::IndexService.new.call
    render json: result, include: :quizzes, status: :ok
  end

  def show
    result = Categories::ShowService.new(@category.id).call
    render json: result, status: :ok
  end

  def create
    result = Categories::CreateService.new(category_params).call

    if result[:success]
      render json: result[:category], status: :created
    else
      render json: { errors: result[:errors] }, status: :unprocessable_entity
    end
  end

  def update
    result = Categories::UpdateService.new(@category, category_params).call

    if result[:success]
      render json: @category, status: :ok
    else
      render json: { errors: result[:errors] }, status: :unprocessable_entity
    end
  end

  def destroy
    Categories::DestroyService.new(@category).call
    head :no_content
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
