class Payment < ApplicationRecord
  VALID_STATUSES = %w[pending processing completed failed refunded].freeze
  VALID_METHODS = %w[credit_card debit_card paypal stripe].freeze

  validates :order_id, presence: true
  validates :user_id, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :payment_method, presence: true, inclusion: { in: VALID_METHODS }
  validates :status, inclusion: { in: VALID_STATUSES }
  validates :transaction_id, uniqueness: true, allow_nil: true

  before_create :generate_transaction_id

  scope :completed, -> { where(status: 'completed') }
  scope :pending, -> { where(status: 'pending') }
  scope :for_user, ->(user_id) { where(user_id: user_id) }
  scope :recent, -> { order(created_at: :desc) }

  def process!
    update(status: 'processing')
    # Simulate payment processing
    sleep(0.5)
    
    # Simulate success (90% success rate)
    if rand < 0.9
      update(status: 'completed')
      true
    else
      update(status: 'failed')
      false
    end
  end

  def refund!
    return false unless status == 'completed'
    update(status: 'refunded')
  end

  private

  def generate_transaction_id
    self.transaction_id = "TXN-#{Time.now.to_i}-#{SecureRandom.hex(4).upcase}"
  end
end
