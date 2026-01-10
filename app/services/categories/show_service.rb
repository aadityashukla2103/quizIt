# frozen_string_literal: true

module Categories
  class ShowService
    def initialize(id)
      @category = Category.find(id)
    end

    def call
      {
        success: true,
        status: :ok,
        data: { category: @category }
      }
    end
  end
end
