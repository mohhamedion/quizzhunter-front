FROM node:14-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application files
COPY . .

# Copy entrypoint script
COPY docker/entrypoint-dev.sh /usr/local/bin/entrypoint-dev.sh
RUN chmod +x /usr/local/bin/entrypoint-dev.sh

# Expose port (will be overridden by docker-compose)
EXPOSE 3000

# Start development server using entrypoint script
ENTRYPOINT ["/usr/local/bin/entrypoint-dev.sh"]
