# frozen_string_literal: true

class Categories::IndexService
  def call
    Category.all
  end
end
