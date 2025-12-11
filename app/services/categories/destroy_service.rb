# frozen_string_literal: true

module Categories
  class DestroyService
    def initialize(category)
      @category = category
    end

    def call
      @category.destroy
      { success: true }
    end
  end
end
