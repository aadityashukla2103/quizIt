# frozen_string_literal: true

class Api::V1::Public::QuizzesController < Api::V1::BaseController
        def show
          result = Public::Quizzes::ShowService.new(params[:id]).call
           render_message(
      result[:message],
      result[:status],
      result[:data]
    )
        end
end
