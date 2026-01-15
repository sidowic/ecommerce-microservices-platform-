# Order Service

Flask microservice for managing e-commerce orders.

## Features

- Order creation and management
- Order status tracking (pending, processing, shipped, delivered, cancelled)
- Order history by user
- Order statistics and revenue tracking
- SQLite database for lightweight storage

## API Endpoints

### Orders
- `GET /api/orders` - List all orders (with pagination and filters)
- `GET /api/orders/:id` - Get specific order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Statistics
- `GET /api/orders/stats` - Get order statistics

### Health
- `GET /health` - Health check

## Query Parameters

- `user_id` - Filter orders by user
- `status` - Filter by order status
- `page` - Page number (default: 1)
- `per_page` - Items per page (default: 20)

## Running Locally

```bash
pip install -r requirements.txt
python app.py
```

## Order Status Flow

1. **pending** - Order created
2. **processing** - Order being prepared
3. **shipped** - Order shipped
4. **delivered** - Order delivered to customer
5. **cancelled** - Order cancelled

## Environment Variables

See `.env.example` for required environment variables.
