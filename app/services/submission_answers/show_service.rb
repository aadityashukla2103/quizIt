# frozen_string_literal: true

module SubmissionAnswers
  class ShowService
    def initialize(submission_answer)
      @submission_answer = submission_answer
    end

    def call
      @submission_answer
    end
  end
end
