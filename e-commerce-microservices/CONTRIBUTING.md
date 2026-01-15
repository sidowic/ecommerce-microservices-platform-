# CONTRIBUTING.md

## Contributing to E-Commerce Microservices Platform

Thank you for your interest in contributing!

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/e-commerce-microservices.git
   cd e-commerce-microservices
   ```

2. **Install Docker & Docker Compose**
   - Docker Desktop (includes Compose)
   - Ensure Docker is running

3. **Start the platform**
   ```bash
   ./start.sh
   ```

## Project Structure

- `/services/` - Backend microservices
  - `product-service/` - Node.js/Express
  - `auth-service/` - Django REST Framework
  - `order-service/` - Flask
  - `payment-service/` - Ruby on Rails
  - `chat-service/` - Node.js/Socket.io

- `/frontends/` - Frontend applications
  - `react-store/` - React customer store
  - `angular-admin/` - Angular admin panel
  - `vue-seller/` - Vue.js seller dashboard

- `/api-gateway/` - Nginx API Gateway

## Making Changes

1. Create a feature branch
2. Make your changes
3. Test locally with Docker
4. Submit a pull request

## Code Standards

- Follow language-specific best practices
- Add comments for complex logic
- Update README when adding features
- Ensure Docker builds succeed

## Testing

Each service has its own test suite. Run tests before submitting:

```bash
# Node.js services
cd services/product-service && npm test

# Python services
cd services/order-service && python -m pytest

# Django services
cd services/auth-service && python manage.py test
```
