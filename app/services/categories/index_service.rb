# frozen_string_literal: true

class Categories::IndexService
  def call
    {
      success: true,
      status: :ok,
      data: Category
        .includes(:quizzes)
        .order(:position)
        .as_json(include: { quizzes: { only: [:id] } })
    }
  end
end
