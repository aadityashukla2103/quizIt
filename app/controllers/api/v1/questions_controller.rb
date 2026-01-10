# frozen_string_literal: true

class Api::V1::QuestionsController < Api::V1::BaseController
  before_action :set_quiz
  before_action :set_question, only: [:show, :update, :destroy, :clone]

  def index
    result = Questions::IndexService.new(@quiz).call
    render_json(result[:data], result[:status] || :ok)
  end

  def show
    result = Questions::ShowService.new(@question).call
    render_json(result[:data], result[:status] || :ok)
  end

  def create
    result = Questions::CreateService.new(@quiz, question_params).call

    if result[:success]
      render_message(result[:message], result[:status] || :created, result[:data])
    else
      render_error(result[:data][:errors], result[:status])
    end
  end

  def update
    result = Questions::UpdateService.new(@question, question_params).call

    if result[:success]
      render_message(result[:message], result[:status] || :ok, result[:data])
    else
      render_error(result[:data][:errors], result[:status])
    end
  end

  def destroy
    result = Questions::DestroyService.new(@question).call
    render_message(result[:message], :ok, result[:data] || {})
  end

  def clone
    result = Questions::CloneService.new(@question).call
    render_message(result[:message], result[:status] || :ok, result[:data])
  end

  private

    def set_quiz
      @quiz = Quiz.find_by!(slug: params[:quiz_slug])
    end

    def set_question
      @question = @quiz.questions.find(params[:id])
    end

    def question_params
      params.require(:question).permit(
        :content,
        options: [:content, :isCorrect]
      )
    end
end
