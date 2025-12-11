# frozen_string_literal: true

class Quizzes::BulkDeleteService
  def initialize(ids)
    @ids = ids
  end

  def call
    if @ids.blank?
      { message: "No quizzes selected", status: :bad_request, data: {} }
    else
      Quiz.where(id: @ids).destroy_all
      { message: "Quizzes deleted successfully", status: :ok, data: {} }
    end
  end
end
