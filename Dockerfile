FROM node:14-alpine

# Install bash for easier container access
RUN apk add --no-cache bash

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application files
COPY . .

# Copy all entrypoint scripts
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY docker/entrypoint-dev.sh /usr/local/bin/entrypoint-dev.sh
COPY docker/entrypoint-prod.sh /usr/local/bin/entrypoint-prod.sh
RUN chmod +x /usr/local/bin/entrypoint.sh /usr/local/bin/entrypoint-dev.sh /usr/local/bin/entrypoint-prod.sh

# Expose port (will be overridden by docker-compose)
EXPOSE 3000

# Smart entrypoint that chooses dev or prod based on NODE_ENV
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
