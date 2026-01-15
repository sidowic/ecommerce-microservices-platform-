#!/bin/bash

echo "🛑 Stopping E-Commerce Microservices Platform..."
docker-compose down

echo ""
echo "✅ All services stopped"
echo ""
echo "💡 To remove volumes (databases): docker-compose down -v"
