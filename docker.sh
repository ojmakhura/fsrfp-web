#!/bin/bash

# Docker management script for FSRFP Web Application

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_usage() {
    echo "Usage: $0 {build|start|stop|restart|logs|clean|dev|prod}"
    echo ""
    echo "Commands:"
    echo "  build     - Build the Docker images"
    echo "  start     - Start the application in production mode"
    echo "  stop      - Stop all running containers"
    echo "  restart   - Restart the application"
    echo "  logs      - Show logs from all containers"
    echo "  clean     - Remove all containers, images, and volumes"
    echo "  dev       - Start the application in development mode"
    echo "  prod      - Start the application in production mode"
    echo ""
}

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

build_images() {
    log_info "Building Docker images..."
    docker-compose build --no-cache
    log_success "Images built successfully!"
}

start_production() {
    log_info "Starting application in production mode..."
    docker-compose up -d
    log_success "Application started! Access at http://localhost"
}

start_development() {
    log_info "Starting application in development mode..."
    docker-compose -f docker-compose.dev.yml up -d
    log_success "Development server started! Access at http://localhost:4200"
}

stop_application() {
    log_info "Stopping application..."
    docker-compose down
    docker-compose -f docker-compose.dev.yml down
    log_success "Application stopped!"
}

restart_application() {
    log_info "Restarting application..."
    stop_application
    start_production
}

show_logs() {
    log_info "Showing logs..."
    docker-compose logs -f
}

clean_all() {
    log_warning "This will remove all containers, images, and volumes!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "Cleaning up..."
        docker-compose down -v --rmi all
        docker-compose -f docker-compose.dev.yml down -v --rmi all
        docker system prune -f
        log_success "Cleanup completed!"
    else
        log_info "Cleanup cancelled."
    fi
}

# Main script logic
case "${1:-}" in
    build)
        build_images
        ;;
    start|prod)
        start_production
        ;;
    dev)
        start_development
        ;;
    stop)
        stop_application
        ;;
    restart)
        restart_application
        ;;
    logs)
        show_logs
        ;;
    clean)
        clean_all
        ;;
    *)
        print_usage
        exit 1
        ;;
esac
