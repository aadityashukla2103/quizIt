# frozen_string_literal: true

module Api
  module V1
    module Quizzes
      class ReportsController < Api::V1::BaseController
        before_action :set_quiz

        def create
          ReportsJob.perform_async(current_user.id, @quiz.id)
          render json: { message: "Report generation started" }, status: :accepted
        end

        def download
          report_file = Rails.root.join("tmp", "quiz_#{@quiz.id}_submissions_report.pdf")

          if File.exist?(report_file)
            send_file(
              report_file,
              type: "application/pdf",
              filename: "quiz_#{@quiz.id}_submissions_report.pdf",
              disposition: "attachment"
            )
          else
            render json: { error: "Report not ready" }, status: :not_found
          end
        end

        private

          def set_quiz
            @quiz = Quiz.find_by!(slug: params[:slug])
 end
      end
    end
  end
end
