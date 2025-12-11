# frozen_string_literal: true

class Quizzes::CreateService
  def initialize(user, params)
    @params = params
    @user = user
  end

  def call
    quiz = Quiz.new(@params)
    quiz.organization_id = @user.organization_id
    quiz.status = "draft"
    quiz.save
    quiz
  end
end
