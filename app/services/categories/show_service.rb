# frozen_string_literal: true

module Categories
  class ShowService
    def initialize(id)
      @category = Category.find(id)
    end

    def call
      @category
    end
  end
end
