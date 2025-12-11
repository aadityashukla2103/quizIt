# frozen_string_literal: true

module SubmissionAnswers
  class IndexService
    def call
      SubmissionAnswer.all
    end
  end
end
