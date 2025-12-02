# frozen_string_literal: true

authenticate :user, ->(u) { u.admin? } do
  ActiveAdmin.routes(self)
end

authenticate :user, ->(u) { !u.admin? } do
  get "/active_admin" => redirect("/")
end
