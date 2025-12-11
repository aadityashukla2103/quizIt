# frozen_string_literal: true

module Categories
  class CreateService
    def initialize(params)
      @params = params
    end

    def call
      category = Category.new(@params)
      if category.save
        { success: true, category: category }
      else
        { success: false, errors: category.errors.full_messages }
      end
    end
  end
end
