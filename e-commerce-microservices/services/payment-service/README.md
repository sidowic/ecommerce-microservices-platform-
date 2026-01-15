# Payment Service

Ruby on Rails API-only microservice for payment processing.

## Features

- Payment creation and processing
- Multiple payment methods support (credit card, debit card, PayPal, Stripe)
- Payment status tracking
- Refund functionality
- Transaction history
- Payment statistics

## API Endpoints

### Payments
- `GET /api/v1/payments` - List all payments
- `GET /api/v1/payments/:id` - Get specific payment
- `POST /api/v1/payments` - Create and process payment
- `PUT /api/v1/payments/:id` - Update payment
- `POST /api/v1/payments/:id/refund` - Refund a payment

### Statistics
- `GET /api/v1/payments/stats` - Get payment statistics

### Health
- `GET /health` - Health check

## Payment Status Flow

1. **pending** - Payment created
2. **processing** - Payment being processed
3. **completed** - Payment successful
4. **failed** - Payment failed
5. **refunded** - Payment refunded

## Running Locally

```bash
bundle install
rails db:create
rails db:migrate
rails server -p 3001
```

## Environment Variables

See `.env.example` for required environment variables.
