# frozen_string_literal: true

class Quizzes::BulkUpdateService
  def initialize(params)
    @ids = params[:ids]
    @updates = params[:updates].to_unsafe_h
  end

  def call
    if @updates.blank?
      { message: "No fields to update", status: :bad_request, data: {} }
    else
      Quiz.where(id: @ids).update_all(@updates)
      { message: "Quizzes updated successfully", status: :ok, data: {} }
    end
  end
end
