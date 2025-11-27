#!/bin/sh
set -e

# Smart entrypoint that chooses dev or prod based on NODE_ENV
if [ "$NODE_ENV" = "production" ]; then
  echo "Production mode detected. Using production entrypoint..."
  exec /usr/local/bin/entrypoint-prod.sh
else
  echo "Development mode detected. Using development entrypoint..."
  exec /usr/local/bin/entrypoint-dev.sh
fi

