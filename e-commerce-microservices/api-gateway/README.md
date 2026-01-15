# API Gateway

Nginx-based API Gateway for routing requests to microservices.

## Features

- Request routing to all microservices
- Rate limiting (10 requests/second with burst of 20)
- Security headers
- WebSocket support for chat service
- Load balancing ready
- Health check endpoints

## Routes

- `/api/products/*` → Product Service (port 5001)
- `/api/auth/*` → Auth Service (port 8000)
- `/api/orders/*` → Order Service (port 5002)
- `/api/v1/payments/*` → Payment Service (port 3001)
- `/socket.io/*` → Chat Service (port 5003)

## Health Checks

- `GET /health` - Gateway health
- `GET /api/status` - Detailed status

## Rate Limiting

Default: 10 requests/second per IP
Burst: 20 requests

## Running

Part of docker-compose setup. Access at http://localhost:80
