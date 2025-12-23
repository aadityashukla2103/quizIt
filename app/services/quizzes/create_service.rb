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
    quiz.creator = @user

    if quiz.save
      {
        message: "Quiz created successfully",
        status: :ok,
        data: { quiz: quiz }
      }
    else
      {
        message: quiz.errors.full_messages.join(", "),
        status: :unprocessable_entity,
        data: {}
      }
    end
  end
end
