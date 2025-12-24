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
    result = ::Options::CreateService.new(@question, option_params).call
    if result[:success]
      render_json(result[:option], result[:status])
    else
      render json: { errors: result[:errors] }, status: result[:status]
    end
  end

  def update
    result = ::Options::UpdateService.new(@option, option_params).call
    if result[:success]
      render_json(result[:option], result[:status])
    else
      render json: { errors: result[:errors] }, status: result[:status]
    end
  end

  def destroy
    result = ::Options::DestroyService.new(@option).call
    head result[:status]
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
