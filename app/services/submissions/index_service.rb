# frozen_string_literal: true

module Submissions
  class IndexService
    def call
      Submission.all
    end
  end
end
