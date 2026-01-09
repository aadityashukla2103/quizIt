# frozen_string_literal: true

class Api::V1::QuestionsController < Api::V1::BaseController
  before_action :set_quiz
  before_action :set_question, only: [:show, :update, :destroy, :clone]

  def index
    result = Questions::IndexService.new(@quiz).call
    render_message(result[:message], result[:status] || :ok, result[:data] || {})
  end

  def show
    result = Questions::ShowService.new(@question).call
    render_message("", :ok, result)
  end

  def create
    result = Questions::CreateService.new(@quiz, question_params).call
    render_message(result[:message], result[:status] || :created, result[:data] || {})
  end

  def update
    result = Questions::UpdateService.new(@question, question_params).call
    render_message("Question updated successfully", :ok, result)
  end

  def destroy
    Questions::DestroyService.new(@question).call
    render_message("Question deleted successfully", :no_content, {})
  end

  def clone
    result = Questions::CloneService.new(@question).call
    render_message("Question cloned successfully", :created, result)
  end

  private

    def set_quiz
      @quiz = Quiz.find_by!(slug: params[:quiz_slug])
    end

    def set_question
      @question = @quiz.questions.find(params[:id])
    end

    def question_params
      params.require(:question).permit(:content, options: [:content, :isCorrect])
    end
end
