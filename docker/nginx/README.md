# Production Nginx Configuration

This nginx configuration file is designed to be used on the **host machine** (not inside Docker) to proxy requests to the Docker container running the Nuxt.js frontend.

## Setup Instructions

### 1. Copy Configuration to Nginx

```bash
sudo cp docker/nginx/production.conf /etc/nginx/sites-available/quizzhunter-frontend
```

### 2. Edit Configuration

```bash
sudo nano /etc/nginx/sites-available/quizzhunter-frontend
```

### 3. Update Required Settings

**a) Update domain name:**
```nginx
server_name your-domain.com www.your-domain.com;
```
Replace `your-domain.com` with your actual domain.

**b) Update upstream port:**
```nginx
upstream nuxt_app {
    server localhost:3000;  # Change 3000 to match your PORT in .env
    keepalive 64;
}
```
Replace `3000` with the port number you configured in your `.env` file (`PORT` variable).

### 4. Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/quizzhunter-frontend /etc/nginx/sites-enabled/
```

### 5. Test Configuration

```bash
sudo nginx -t
```

### 6. Reload Nginx

```bash
sudo systemctl reload nginx
```

## SSL/HTTPS Setup

After setting up SSL certificates (e.g., using Let's Encrypt with Certbot):

1. Uncomment the HTTPS server block in the configuration file
2. Update the SSL certificate paths:
   ```nginx
   ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
   ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
   ```
3. Uncomment the HTTP to HTTPS redirect in the HTTP server block
4. Reload nginx

## Example with Certbot

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Certbot will automatically configure SSL for you.

## Notes

- The configuration includes gzip compression for better performance
- Static files are cached for 1 year
- Upload size limit is set to 20MB
- WebSocket support is enabled for hot-reload
