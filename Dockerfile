FROM node:14-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application files
COPY . .

# Copy both entrypoint scripts
COPY docker/entrypoint-dev.sh /usr/local/bin/entrypoint-dev.sh
COPY docker/entrypoint-prod.sh /usr/local/bin/entrypoint-prod.sh
RUN chmod +x /usr/local/bin/entrypoint-dev.sh /usr/local/bin/entrypoint-prod.sh

# Expose port (will be overridden by docker-compose)
EXPOSE 3000

# Default to development entrypoint (can be overridden in docker-compose)
ENTRYPOINT ["/usr/local/bin/entrypoint-dev.sh"]
