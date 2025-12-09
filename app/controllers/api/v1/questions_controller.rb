# frozen_string_literal: true

class Api::V1::QuestionsController < Api::V1::BaseController
  before_action :set_quiz
  before_action :set_question, only: [:show, :update, :destroy]

  def index
    questions = @quiz.questions.includes(:options)
    render json: questions.as_json(include: :options)
  end

  def show
    render json: @question.as_json(include: :options)
  end

  def create
    question = @quiz.questions.build(content: question_params[:content])

    if question.save
      if question_params[:options]
        question_params[:options].each do |opt|
          question.options.create(content: opt[:content], is_correct: opt[:isCorrect])
        end
      end
      render_message(
        t("question.created_successfully"),
        :created,
        { question: question.as_json(include: :options) }
      )
    else
      render_message(
        t("question.creation_failed"),
        :unprocessable_entity,
        { errors: question.errors.full_messages }
      )
    end
  end

  def update
    ActiveRecord::Base.transaction do
      @question.update!(content: question_params[:content])

      if question_params[:options]
        @question.options.destroy_all

        question_params[:options].each do |opt|
          @question.options.create!(
            content: opt[:content],
            is_correct: opt[:isCorrect]
          )
        end
      end
    end

    render_message(
      t("question.updated_successfully"),
      :ok,
      { question: @question.as_json(include: :options) }
    )
  rescue ActiveRecord::RecordInvalid => e
    render_message(
      t("question.update_failed"),
      :unprocessable_entity,
      { errors: e.record.errors.full_messages }
    )
  end

  def destroy
    @question.destroy
    render_message(t("question.deleted_successfully"), :ok)
  end

  def clone
    original_question = @quiz.questions.find(params[:id])
    cloned_question = original_question.clone_question!
    render json: cloned_question.as_json(include: :options), status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
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
