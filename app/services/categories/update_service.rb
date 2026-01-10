# frozen_string_literal: true

module Categories
  class UpdateService
    def initialize(category, params)
      @category = category
      @params = params
    end

    def call
      if @category.update(@params)
        {
          success: true,
          message: "Category updated successfully",
          status: :ok,
          data: { category: @category }
        }
      else
        {
          success: false,
          message: "Category update failed",
          status: :unprocessable_entity,
          data: { errors: @category.errors.full_messages }
        }
      end
    end
  end
end
