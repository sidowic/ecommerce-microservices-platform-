# Auth Service

Django REST Framework microservice for user authentication and management.

## Features

- User registration and login
- JWT token-based authentication
- Role-based access control (Customer, Seller, Admin)
- User profile management
- Password change functionality
- PostgreSQL database
- Swagger API documentation

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/token/refresh/` - Refresh JWT token
- `GET /api/auth/profile/` - Get user profile
- `PUT /api/auth/profile/update/` - Update user profile
- `POST /api/auth/password/change/` - Change password

### Health
- `GET /api/health/` - Health check

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run migrations:
```bash
python manage.py migrate
```

3. Create superuser:
```bash
python manage.py createsuperuser
```

4. Run server:
```bash
python manage.py runserver 8000
```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/api/docs/
- ReDoc: http://localhost:8000/api/redoc/

## Environment Variables

See `.env.example` for required environment variables.
