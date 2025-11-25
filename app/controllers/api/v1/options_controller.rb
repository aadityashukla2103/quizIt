# frozen_string_literal: true

class Api::V1::OptionsController < ApplicationController
  before_action :set_question
  before_action :set_option, only: [:show, :update, :destroy]

  def index
    render json: @question.options
  end

  def show
    render json: @option
  end

  def create
    option = @question.options.build(option_params)
    if option.save
      render json: option, status: :created
    else
      render json: { errors: option.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @option.update(option_params)
      render json: @option
    else
      render json: { errors: @option.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @option.destroy
    head :no_content
  end

  private

    def set_question
      @question = Question.find(params[:question_id])
    end

    def set_option
      @option = @question.options.find(params[:id])
    end

    def option_params
      params.require(:option).permit(:content, :is_correct)
    end
end
