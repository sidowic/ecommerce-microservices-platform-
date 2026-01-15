module Api
  module V1
    class PaymentsController < ApplicationController
      before_action :set_payment, only: [:show, :update, :refund]

      # GET /api/v1/payments
      def index
        @payments = Payment.all
        @payments = @payments.for_user(params[:user_id]) if params[:user_id]
        @payments = @payments.where(status: params[:status]) if params[:status]
        @payments = @payments.recent.page(params[:page]).per(params[:per_page] || 20)

        render json: {
          payments: @payments.as_json,
          pagination: {
            current_page: @payments.current_page,
            total_pages: @payments.total_pages,
            total_count: @payments.total_count
          }
        }
      end

      # GET /api/v1/payments/:id
      def show
        render json: @payment
      end

      # POST /api/v1/payments
      def create
        @payment = Payment.new(payment_params)

        if @payment.save
          # Process payment asynchronously in production
          if @payment.process!
            render json: @payment, status: :created
          else
            render json: { error: 'Payment processing failed' }, status: :unprocessable_entity
          end
        else
          render json: { errors: @payment.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/payments/:id
      def update
        if @payment.update(payment_params)
          render json: @payment
        else
          render json: { errors: @payment.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # POST /api/v1/payments/:id/refund
      def refund
        if @payment.refund!
          render json: { message: 'Payment refunded successfully', payment: @payment }
        else
          render json: { error: 'Refund failed. Payment must be completed.' }, status: :unprocessable_entity
        end
      end

      # GET /api/v1/payments/stats
      def stats
        total_payments = Payment.count
        completed_payments = Payment.completed.count
        total_revenue = Payment.completed.sum(:amount)
        pending_payments = Payment.pending.count

        render json: {
          total_payments: total_payments,
          completed_payments: completed_payments,
          pending_payments: pending_payments,
          total_revenue: total_revenue.to_f
        }
      end

      private

      def set_payment
        @payment = Payment.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Payment not found' }, status: :not_found
      end

      def payment_params
        params.require(:payment).permit(:order_id, :user_id, :amount, :currency, :payment_method, :metadata)
      end
    end
  end
end
