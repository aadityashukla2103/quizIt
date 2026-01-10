# frozen_string_literal: true

module Categories
  class DestroyService
    def initialize(category)
      @category = category
    end

    def call
      @category.destroy

      {
        success: true,
        message: "Category deleted successfully",
        status: :ok,
        data: {}
      }
    end
  end
end
