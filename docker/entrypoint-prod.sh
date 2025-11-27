#!/bin/sh
set -e

# Check if .nuxt directory exists and has content
if [ ! -d ".nuxt" ] || [ -z "$(ls -A .nuxt 2>/dev/null)" ]; then
  echo "Building Nuxt application for production..."
  npm run build
  
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

