# frozen_string_literal: true

module Options
  class CreateService
    def initialize(question, params)
      @question = question
      @params = params
    end

    def call
      option = @question.options.build(@params)

      if option.save
        { success: true, option: option, status: :created }
      else
        { success: false, errors: option.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end
end
