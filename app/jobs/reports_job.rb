# frozen_string_literal: true

class ReportsJob
  include Sidekiq::Worker

  def perform(user_id, quiz_id)
    submissions = Submission.where(quiz_id: quiz_id)

    html = ApplicationController.renderer.render(
      template: "api/v1/reports/download",
      locals: { submissions: submissions },
      layout: false
    )
    file_path = Rails.root.join("tmp", "quiz_#{quiz_id}_submissions_report.pdf")

    pdf = WickedPdf.new.pdf_from_string(html)
    File.open(file_path, "wb") { |f| f.write(pdf) }
  end
end
