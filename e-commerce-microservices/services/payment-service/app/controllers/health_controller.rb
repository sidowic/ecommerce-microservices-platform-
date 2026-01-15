class HealthController < ApplicationController
  def check
    render json: {
      status: 'healthy',
      service: 'payment-service',
      timestamp: Time.now.iso8601
    }
  end
end
