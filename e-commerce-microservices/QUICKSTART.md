# Quick Start Guide

## Prerequisites

- Docker Desktop
- 8GB RAM minimum
- 10GB free disk space

## Installation

1. **Start the platform**
   ```bash
   ./start.sh
   ```

2. **Wait for services to initialize** (1-2 minutes)

3. **Access the applications**
   - Customer Store: http://localhost:3000
   - Admin Panel: http://localhost:4200
   - Seller Dashboard: http://localhost:8080

## First Steps

### 1. Create a User Account
Visit http://localhost:3000 and click "Register"

### 2. Browse Products
Navigate to the Products page to see the catalog

### 3. Try Real-time Chat
Click the chat icon in the bottom-right corner

### 4. Admin Access
Visit http://localhost:4200 to access the admin dashboard

## Stopping the Platform

```bash
./stop.sh
```

## Troubleshooting

### Services not starting?
```bash
docker-compose logs [service-name]
```

### Port conflicts?
Edit `docker-compose.yml` to change port mappings

### Need to reset?
```bash
docker-compose down -v
./start.sh
```

## Next Steps

- Read the full [README.md](README.md)
- Check individual service READMEs
- View API documentation at service endpoints

## Support

Open an issue on GitHub for help!
