# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    path = request.path
    redirection = Redirection.find_by(from_path: path)
    if redirection
      redirect_to redirection.to_path, status: 301
      return
    end

    respond_to do |format|
      format.html
      format.any { head :ok }
    end
  end
end
