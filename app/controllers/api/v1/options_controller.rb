# frozen_string_literal: true

class Api::V1::OptionsController < Api::V1::BaseController
  before_action :set_question
  before_action :set_option, only: [:show, :update, :destroy]

  def index
    render_json(@question.options)
  end

  def show
    render_json(@option)
  end

  def create
    option = @question.options.build(option_params)
    if option.save
      render_json(option, :created)
    else
      render json: { errors: option.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @option.update(option_params)
      render_json(@option)
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
