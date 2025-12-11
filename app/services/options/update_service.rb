# frozen_string_literal: true

module Options
  class UpdateService
    def initialize(option, params)
      @option = option
      @params = params
    end

    def call
      if @option.update(@params)
        { success: true, option: @option, status: :ok }
      else
        { success: false, errors: @option.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end
end
