# frozen_string_literal: true

module Categories
  class UpdateService
    def initialize(category, params)
      @category = category
      @params = params
    end

    def call
      if @category.update(@params)
        { success: true, category: @category }
      else
        { success: false, errors: @category.errors.full_messages }
      end
    end
  end
end
