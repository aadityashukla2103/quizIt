# frozen_string_literal: true

class Categories::IndexService
  def call
    Category
      .includes(:quizzes)
      .order(:position)
  end
end
