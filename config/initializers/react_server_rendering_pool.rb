# frozen_string_literal: true

require "react/server_rendering"
require "connection_pool"

# React::ServerRendering.reset_pool used positional args, which fails on Ruby 3.3
# with connection_pool 3.x. Override to pass keyword args instead.
Rails.application.config.to_prepare do
  React::ServerRendering.singleton_class.class_eval do
    define_method(:reset_pool) do
      options = { size: pool_size, timeout: pool_timeout }.compact
      @pool = ConnectionPool.new(**options) { renderer.new(renderer_options) }
    end
  end
end
