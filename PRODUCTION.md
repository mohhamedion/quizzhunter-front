# Running QuizzHunter Frontend in Production Mode

## Prerequisites

1. Ensure you have a `.env` file with production configuration
2. Make sure your backend API is accessible

## Method 1: Using Production Docker Compose (Recommended)

This method uses a dedicated production Dockerfile that builds the application during the Docker build process.

### Step 1: Configure Environment Variables

Create or update your `.env` file:

```env
# Backend API URL (must be accessible from browser)
BACKEND_URL=https://your-backend-api.com
# Or for local testing: http://localhost:8080

# Frontend Port
PORT=3000

# Frontend URL (for CORS and redirects)
FRONTEND_URL=https://your-frontend-domain.com
# Or for local testing: http://localhost:3000

# API Base URL (alias for BACKEND_URL)
API_BASE_URL=${BACKEND_URL}
BASE_URL=${BACKEND_URL}
```

### Step 2: Build and Start Production Container

```bash
cd quizzhunter-front

# Build and start in one command
docker-compose -f docker-compose.prod.yml up -d --build

# Or build first, then start
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
```

### Step 3: Check Logs

```bash
docker-compose -f docker-compose.prod.yml logs -f
```

You should see:
```
Building Nuxt application for production...
Build completed successfully!
Starting Nuxt production server...
```

### Step 4: Access the Application

- Frontend: http://localhost:3000 (or your configured PORT)
- The application is now running in production mode

### Useful Commands

```bash
# Stop production container
docker-compose -f docker-compose.prod.yml down

# Restart production container
docker-compose -f docker-compose.prod.yml restart

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Rebuild after code changes
docker-compose -f docker-compose.prod.yml up -d --build
```

## Method 2: Using Regular Docker Compose with Production Mode

This method uses the regular docker-compose.yml but switches to production mode.

### Step 1: Update docker-compose.yml

Change `NODE_ENV` from `development` to `production`:

```yaml
environment:
  - NODE_ENV=production  # Changed from 'development'
```

### Step 2: Build and Start

```bash
cd quizzhunter-front

# Build the application inside the container
docker-compose up -d
docker-compose exec frontend npm run build

# Restart to use production mode
docker-compose restart frontend
```

The smart entrypoint will automatically detect `NODE_ENV=production` and use the production entrypoint.

## Differences Between Methods

### Method 1 (docker-compose.prod.yml):
- ✅ Builds during Docker image creation (faster startup)
- ✅ Multi-stage build (smaller final image)
- ✅ No volume mounts (immutable production image)
- ✅ Optimized for production

### Method 2 (docker-compose.yml with NODE_ENV=production):
- ✅ Uses existing docker-compose.yml
- ✅ File syncing still works (good for testing)
- ⚠️ Builds on first container start
- ⚠️ Larger image (includes dev dependencies)

## Production Checklist

- [ ] `.env` file configured with production URLs
- [ ] Backend API is accessible
- [ ] CORS configured on backend for frontend domain
- [ ] Port 3000 (or configured PORT) is available
- [ ] Container is running: `docker ps | grep quizzhunter-frontend`
- [ ] Logs show "Starting Nuxt production server..."
- [ ] Application accessible at configured URL

## Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs

# Check if port is in use
netstat -tulpn | grep 3000
```

### .nuxt directory still empty
```bash
# Method 1: Rebuild the image
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Method 2: Build manually
docker-compose exec frontend npm run build
```

### Backend connection errors
- Verify `BACKEND_URL` in `.env` is correct
- Ensure backend is accessible from browser
- Check backend CORS settings
- Test backend URL in browser

### Performance issues
- Use Method 1 (production Dockerfile) for better performance
- Consider using nginx reverse proxy (see `docker/nginx/production.conf`)
- Enable gzip compression in nginx

