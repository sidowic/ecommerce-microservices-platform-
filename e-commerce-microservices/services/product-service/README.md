# Product Service

Node.js microservice for managing product catalog.

## Features

- RESTful API for product CRUD operations
- MongoDB for flexible schema
- Full-text search
- Advanced filtering and pagination
- Category management
- Stock tracking
- Performance optimization with indexes

## API Endpoints

### Products
- `GET /api/products` - List all products (with pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product (soft delete)

### Meta
- `GET /api/products/meta/categories` - Get all categories

## Query Parameters

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `search` - Full-text search

## Running Locally

```bash
npm install
npm run dev
```

## Environment Variables

See `.env.example` for required environment variables.
