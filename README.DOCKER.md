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

### Start the container:

```bash
docker-compose up -d
```

### View logs:

```bash
docker-compose logs -f
```

### Stop the container:

```bash
docker-compose down
```

### Rebuild after dependency changes:

```bash
docker-compose build --no-cache
docker-compose up -d
```

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
