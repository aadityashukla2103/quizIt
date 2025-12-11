# frozen_string_literal: true

module Options
  class DestroyService
    def initialize(option)
      @option = option
    end

    def call
      @option.destroy
      { success: true, status: :no_content }
    rescue => e
      { success: false, errors: [e.message], status: :unprocessable_entity }
    end
  end
end
