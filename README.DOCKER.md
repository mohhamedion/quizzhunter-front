# Docker Setup for QuizzHunter Frontend

This document explains how to set up and run the QuizzHunter frontend using Docker Compose.

## Prerequisites

- Docker and Docker Compose installed
- Backend API running and accessible

## Important: Public URLs Required

**Why Public URLs?**
Nuxt.js is a client-server framework. The environment variables defined in `nuxt.config.js` under the `env` section are exposed to the **browser (client-side code)**. This means:

- ✅ **Use public URLs** like `http://localhost:8080` or `https://api.example.com`
- ❌ **Do NOT use Docker internal URLs** like `http://host.docker.internal:8080` or container names
- The browser cannot access Docker's internal network - it needs public URLs

The URLs you configure will be used by the browser to make API requests, so they must be accessible from the browser's perspective.

## Configuration

### 1. Create `.env` file

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

### 2. Configure Environment Variables

Edit the `.env` file with your settings:

```env
# Backend API URL (PUBLIC URL - accessible from browser)
# IMPORTANT: This is a PUBLIC URL that the browser will use to make API requests
# The browser cannot access Docker internal URLs (like host.docker.internal)
# In development: http://localhost:8080 (if backend is on host machine)
# In production: https://your-backend-api-domain.com
BACKEND_URL=http://localhost:8080

# Frontend Application Port (mapped to host)
PORT=3000

# Frontend URL (PUBLIC URL - for CORS and redirects)
# In development: http://localhost:3000
# In production: https://your-frontend-domain.com
FRONTEND_URL=http://localhost:3000

# API Base URL (alias for BACKEND_URL - PUBLIC URL)
API_BASE_URL=http://localhost:8080

# Base URL (alias for BACKEND_URL - PUBLIC URL)
BASE_URL=http://localhost:8080
```

**Important Notes:**
- All URLs must be **public URLs** that the browser can access
- The browser (client-side) cannot access Docker internal network URLs
- If your backend is on `localhost:8080`, use `http://localhost:8080`
- If your backend is on a different domain, use that domain (e.g., `https://api.example.com`)

## Running with Docker Compose

### Development Mode

#### Start the container:

```bash
docker-compose up -d
```

#### View logs:

```bash
docker-compose logs -f
```

#### Stop the container:

```bash
docker-compose down
```

#### Rebuild after dependency changes:

```bash
docker-compose build --no-cache
docker-compose up -d
```

### Production Mode

For production, you have two options:

#### Option 1: Use Production Dockerfile (Recommended)

This builds the application during the Docker build process:

```bash
# Build and start production container
docker-compose -f docker-compose.prod.yml up -d --build

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop
docker-compose -f docker-compose.prod.yml down
```

#### Option 2: Build in Existing Container

If you're using the regular docker-compose.yml, you can build inside the container:

```bash
# Start container (development mode)
docker-compose up -d

# Build the application inside the container
docker-compose exec frontend npm run build

# Switch to production mode by updating environment
# Edit docker-compose.yml and change:
#   - NODE_ENV=production
#   - entrypoint: /usr/local/bin/entrypoint-prod.sh
# Then restart:
docker-compose restart frontend
```

**Important for Production:**
- The `.nuxt` directory must be populated with built assets
- Use `npm run build` to generate production assets
- Production mode uses `npm run start` instead of `npm run dev`

## File Syncing

The project files are synced between the host and container:
- All source files are mounted from `./` to `/app`
- `node_modules` and `.nuxt` are excluded from syncing (kept in container)

Changes to files will be automatically reflected in the container (hot-reload enabled).

## Production Nginx Setup

For production deployment, use the nginx configuration file:

1. Copy `docker/nginx/production.conf` to your nginx sites-available:

```bash
sudo cp docker/nginx/production.conf /etc/nginx/sites-available/quizzhunter-frontend
```

2. Edit the configuration:

```bash
sudo nano /etc/nginx/sites-available/quizzhunter-frontend
```

3. Update the following:
   - `server_name`: Your domain name
   - `upstream nuxt_app`: Port number (default: 3000)

4. Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/quizzhunter-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

5. For SSL/HTTPS, uncomment and configure the HTTPS server block in the nginx config.

## Accessing the Application

- Development: http://localhost:3000 (or your configured PORT)
- Production: Configured via nginx (default port 80/443)

## Troubleshooting

### Port already in use

If port 3000 is already in use, change the `PORT` in `.env`:

```env
PORT=3001
```

### Backend connection issues

If the frontend can't connect to the backend:

1. Check `BACKEND_URL` in `.env` - it must be a **public URL** accessible from the browser
2. **DO NOT use Docker internal URLs** like `host.docker.internal` - the browser cannot access these
3. Use `http://localhost:8080` if backend is running on the host machine
4. Use the public domain/IP if backend is on a different server (e.g., `https://api.example.com`)
5. Ensure backend is accessible from the browser (test by opening the URL in browser)
6. Ensure backend CORS is configured to allow requests from your frontend domain
7. Check browser console for CORS errors

### Empty .nuxt directory (Production Mode)

If you're running in production mode and the `.nuxt` directory is empty:

**Solution 1: Build inside the container**
```bash
docker-compose exec frontend npm run build
```

**Solution 2: Use production Dockerfile**
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

**Solution 3: Build manually before starting**
```bash
# Build the application
docker-compose exec frontend npm run build

# Then restart with production entrypoint
# Update docker-compose.yml to use entrypoint-prod.sh
docker-compose restart frontend
```

**Note:** In development mode, Nuxt generates assets on-demand. In production mode, you must run `npm run build` first.

### Node modules issues

If you encounter node_modules errors:

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Development Tips

- File changes are automatically synced and hot-reloaded
- To install new npm packages, run:

```bash
docker-compose exec frontend npm install package-name
```

- To run commands inside the container:

```bash
docker-compose exec frontend npm run <command>
```
