#!/bin/bash

echo "🚀 Starting E-Commerce Microservices Platform..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install it and try again."
    exit 1
fi

# Build and start all services
echo "📦 Building and starting all services..."
docker-compose up --build -d

# Wait for services to be ready
echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo ""
echo "🏥 Checking service health..."
echo ""

services=(
    "http://localhost:5001/health:Product Service"
    "http://localhost:8000/api/health/:Auth Service"
    "http://localhost:5002/health:Order Service"
    "http://localhost:3001/health:Payment Service"
    "http://localhost:5003/health:Chat Service"
    "http://localhost:80/health:API Gateway"
)

for service in "${services[@]}"; do
    IFS=: read -r url name <<< "$service"
    if curl -s -f "$url" > /dev/null; then
        echo "✅ $name - Running"
    else
        echo "⚠️  $name - Not responding yet"
    fi
done

echo ""
echo "🎉 Platform is starting up!"
echo ""
echo "📍 Access points:"
echo "   - React Store:        http://localhost:3000"
echo "   - Angular Admin:      http://localhost:4200"
echo "   - Vue Seller:         http://localhost:8080"
echo "   - API Gateway:        http://localhost:80"
echo "   - Product Service:    http://localhost:5001"
echo "   - Auth Service:       http://localhost:8000"
echo "   - Order Service:      http://localhost:5002"
echo "   - Payment Service:    http://localhost:3001"
echo "   - Chat Service:       http://localhost:5003"
echo ""
echo "💡 View logs: docker-compose logs -f [service-name]"
echo "🛑 Stop all:  docker-compose down"
echo ""
