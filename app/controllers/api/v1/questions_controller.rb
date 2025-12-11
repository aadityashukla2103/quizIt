# frozen_string_literal: true

class Api::V1::QuestionsController < Api::V1::BaseController
  before_action :set_quiz
  before_action :set_question, only: [:show, :update, :destroy, :clone]

  def index
    result = Questions::IndexService.new(@quiz).call
    render_message(message: result[:message], data: result[:data], status: result[:status])
  end

  def show
    result = Questions::ShowService.new(@question).call
    render_message(result[:message], :ok, result[:data])
   end

  def create
    result = Questions::CreateService.new(@quiz, question_params).call
    render_message(result[:message], result[:status])
  end

  def update
    result = Questions::UpdateService.new(@question, question_params).call
    render_message(result[:message], result[:status], result[:data])
  end

  def destroy
    result = Questions::DestroyService.new(@question).call
    render_message(result[:message], result[:status], result[:data])
  end

  def clone
    result = Questions::CloneService.new(@question).call
    render_message(result[:message], result[:status], result[:data])
  end

  private

    def set_quiz
      @quiz = Quiz.find(params[:quiz_id])
    end

    def set_question
      @question = @quiz.questions.find(params[:id])
    end

    def question_params
      params.require(:question).permit(:content, options: [:content, :isCorrect])
    end
end
