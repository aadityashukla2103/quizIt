    # frozen_string_literal: true

    class Api::V1::QuestionsController < ApplicationController
      before_action :set_quiz
      before_action :set_question, only: [:show, :update, :destroy]

      def index
        render json: @quiz.questions
      end

      def show
        render json: @question
      end

      def create
        question = @quiz.questions.build(content: question_params[:content])

        if question.save
          if question_params[:options]
            question_params[:options].each do |opt|
              question.options.create(content: opt[:content], is_correct: opt[:isCorrect])
            end
          end
          render json: question, status: :created
        else
          render json: { errors: question.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @question.update(question_params)
          render json: @question
        else
          render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @question.destroy
        head :no_content
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
