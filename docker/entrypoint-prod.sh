#!/bin/sh
set -e

# Check if .nuxt directory exists and has content
if [ ! -d ".nuxt" ] || [ -z "$(ls -A .nuxt 2>/dev/null)" ]; then
  echo "Building Nuxt application for production..."
  
  # Use build script that works with Node 14 (no NODE_OPTIONS flag)
  if [ -f "/usr/local/bin/build.sh" ]; then
    /usr/local/bin/build.sh
  else
    # Fallback: run nuxt build directly (Node 14 doesn't need openssl-legacy-provider)
    node node_modules/.bin/nuxt build
  fi
  
  # Verify build was successful
  if [ ! -d ".nuxt" ] || [ -z "$(ls -A .nuxt 2>/dev/null)" ]; then
    echo "ERROR: Build failed! .nuxt directory is still empty."
    exit 1
  fi
  echo "Build completed successfully!"
fi

# Start production server
echo "Starting Nuxt production server..."
exec npm run start

