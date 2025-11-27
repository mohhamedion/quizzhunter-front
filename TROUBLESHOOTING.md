# Troubleshooting: _nuxt Files Not Found (404)

If you're getting 404 errors for `_nuxt` files like:
```
GET https://quizzhunter.smartsupport.pro/_nuxt/36101b8.js - Not found
```

## Quick Diagnosis

### 1. Check if container is running

```bash
docker ps | grep quizzhunter-frontend
```

If not running, start it:
```bash
cd quizzhunter-front
docker-compose -f docker-compose.prod.yml up -d
```

### 2. Check container logs

```bash
docker-compose -f docker-compose.prod.yml logs -f frontend
```

Look for:
- ✅ "Build completed successfully!"
- ✅ "Starting Nuxt production server..."
- ✅ "Listening on: http://0.0.0.0:3000"
- ❌ "ERROR: Build failed!"
- ❌ "ERROR: .nuxt/dist/client directory is missing!"

### 3. Check if .nuxt directory exists in container

```bash
docker-compose -f docker-compose.prod.yml exec frontend ls -la .nuxt/
```

Should show:
```
dist/
client.js
server.js
...
```

### 4. Check if dist/client exists

```bash
docker-compose -f docker-compose.prod.yml exec frontend ls -la .nuxt/dist/client/ | head -20
```

Should show files like:
```
36101b8.js
app.js
...
```

### 5. Check if Nuxt server is responding

```bash
# From inside container
docker-compose -f docker-compose.prod.yml exec frontend curl http://localhost:3000/_nuxt/app.js

# From host (if port is exposed)
curl http://localhost:3000/_nuxt/app.js
```

## Common Solutions

### Solution 1: Rebuild the application

```bash
# Stop container
docker-compose -f docker-compose.prod.yml down

# Rebuild and start
docker-compose -f docker-compose.prod.yml up -d --build

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Solution 2: Build manually inside container

```bash
# Enter container
docker-compose -f docker-compose.prod.yml exec frontend sh

# Build manually
/usr/local/bin/build.sh

# Verify build
ls -la .nuxt/dist/client/

# Exit and restart
exit
docker-compose -f docker-compose.prod.yml restart frontend
```

### Solution 3: Check nginx configuration

Verify nginx is proxying correctly:

```bash
# Check nginx config
sudo nginx -t

# Check if nginx is running
sudo systemctl status nginx

# Check nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check nginx access logs
sudo tail -f /var/log/nginx/access.log
```

### Solution 4: Verify upstream connection

In nginx config, check that `upstream nuxt_app` points to the correct port:

```nginx
upstream nuxt_app {
    server localhost:3000;  # Should match your container port
    keepalive 64;
}
```

Test connection:
```bash
# From host machine
curl http://localhost:3000/_nuxt/app.js
```

### Solution 5: Check file permissions

```bash
docker-compose -f docker-compose.prod.yml exec frontend ls -la .nuxt/
docker-compose -f docker-compose.prod.yml exec frontend ls -la .nuxt/dist/
```

Files should be readable.

## Debugging Steps

1. **Check container status:**
   ```bash
   docker-compose -f docker-compose.prod.yml ps
   ```

2. **Check if port 3000 is accessible:**
   ```bash
   netstat -tulpn | grep 3000
   ```

3. **Test direct connection to Nuxt:**
   ```bash
   curl -I http://localhost:3000
   curl -I http://localhost:3000/_nuxt/app.js
   ```

4. **Check nginx proxy:**
   ```bash
   curl -I https://quizzhunter.smartsupport.pro/_nuxt/app.js
   ```

5. **View real-time logs:**
   ```bash
   # Container logs
   docker-compose -f docker-compose.prod.yml logs -f frontend
   
   # Nginx logs (on server)
   sudo tail -f /var/log/nginx/error.log
   sudo tail -f /var/log/nginx/access.log
   ```

## Expected File Structure

After successful build, you should have:

```
.nuxt/
├── dist/
│   ├── client/
│   │   ├── 36101b8.js
│   │   ├── app.js
│   │   ├── app.css
│   │   └── ... (other built files)
│   └── server/
├── client.js
├── server.js
└── ...
```

## Still Not Working?

1. **Check Docker volumes:**
   ```bash
   docker-compose -f docker-compose.prod.yml config
   ```

2. **Rebuild from scratch:**
   ```bash
   docker-compose -f docker-compose.prod.yml down -v
   docker-compose -f docker-compose.prod.yml build --no-cache
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Check Node version in container:**
   ```bash
   docker-compose -f docker-compose.prod.yml exec frontend node --version
   # Should be v14.x.x
   ```

4. **Verify build script works:**
   ```bash
   docker-compose -f docker-compose.prod.yml exec frontend /usr/local/bin/build.sh
   ```

