# Docker Deployment Guide

## Overview

This directory contains Docker configuration files for the FSRFP Web Application, supporting both development and production environments.

## Files

- `Dockerfile` - Production build configuration
- `Dockerfile.dev` - Development build configuration
- `docker-compose.yml` - Production environment setup
- `docker-compose.dev.yml` - Development environment setup
- `docker.sh` - Management script for common Docker operations
- `.dockerignore` - Files to exclude from Docker build context

## Quick Start

### Production Deployment

```bash
# Build and start the application
./docker.sh build
./docker.sh start

# Access the application at http://localhost
```

### Development Setup

```bash
# Start development environment with live reload
./docker.sh dev

# Access the development server at http://localhost:4200
```

## Management Script Usage

The `docker.sh` script provides convenient commands for managing the application:

```bash
./docker.sh build     # Build Docker images
./docker.sh start     # Start production environment
./docker.sh dev       # Start development environment
./docker.sh stop      # Stop all containers
./docker.sh restart   # Restart the application
./docker.sh logs      # View container logs
./docker.sh clean     # Remove all containers and images
```

## Services

### Frontend (Angular)
- **Production**: Nginx serving built Angular app on port 80
- **Development**: Angular CLI dev server on port 4200 with live reload

### Backend (Java - Placeholder)
- **Port**: 8080
- **Environment**: Configurable via environment variables
- **Database**: PostgreSQL connection

### Database (PostgreSQL)
- **Port**: 5432 (production), 5433 (development)
- **Database**: fsrfp (production), fsrfp_dev (development)
- **Credentials**: fsrfp_user / fsrfp_password

### Redis (Optional)
- **Port**: 6379
- **Purpose**: Caching layer

## Environment Configuration

### Production Environment Variables

```bash
NODE_ENV=production
SPRING_PROFILES_ACTIVE=docker
DATABASE_URL=jdbc:postgresql://db:5432/fsrfp
DATABASE_USERNAME=fsrfp_user
DATABASE_PASSWORD=fsrfp_password
```

### Development Environment Variables

```bash
NODE_ENV=development
SPRING_PROFILES_ACTIVE=development
DATABASE_URL=jdbc:postgresql://db:5432/fsrfp_dev
DATABASE_USERNAME=fsrfp_user
DATABASE_PASSWORD=fsrfp_password
```

## Manual Docker Commands

### Build Production Image

```bash
docker build -t fsrfp-web .
```

### Run Production Container

```bash
docker run -p 80:80 fsrfp-web
```

### Build Development Image

```bash
docker build -f Dockerfile.dev -t fsrfp-web-dev .
```

### Run Development Container

```bash
docker run -p 4200:4200 -v $(pwd):/app -v /app/node_modules fsrfp-web-dev
```

## Production Deployment

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Health Checks

- Frontend: `http://localhost/`
- Backend API: `http://localhost/api/health` (if implemented)
- Database: Port 5432 accessible for admin tools

## Development Workflow

1. **Start Development Environment**:
   ```bash
   ./docker.sh dev
   ```

2. **Make Code Changes**: Files are automatically reloaded

3. **View Logs**:
   ```bash
   ./docker.sh logs
   ```

4. **Stop Development Environment**:
   ```bash
   ./docker.sh stop
   ```

## Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure ports 80, 4200, 8080, 5432 are available
2. **Permission Issues**: Ensure docker.sh is executable (`chmod +x docker.sh`)
3. **Build Failures**: Clear Docker cache with `./docker.sh clean`

### Debug Commands

```bash
# Check running containers
docker ps

# Check container logs
docker logs <container_name>

# Execute commands in container
docker exec -it <container_name> /bin/sh

# Check Docker networks
docker network ls
```

## Security Considerations

- Change default database credentials in production
- Use environment-specific configuration files
- Implement proper SSL/TLS certificates for production
- Regular security updates for base images

## Performance Optimization

- Multi-stage builds reduce image size
- Nginx compression enabled for static assets
- PostgreSQL optimized for Docker environment
- Redis caching for improved response times

## Monitoring

Consider adding monitoring tools:
- Application logs: `docker-compose logs`
- System metrics: Docker stats
- Health checks: Custom health endpoints
- Database monitoring: PostgreSQL logs
