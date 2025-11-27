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
  
  # Verify build was successful - check for dist directory
  if [ ! -d ".nuxt/dist" ]; then
    echo "ERROR: Build failed! .nuxt/dist directory not found."
    echo "Checking .nuxt contents:"
    ls -la .nuxt/ || echo ".nuxt directory doesn't exist"
    exit 1
  fi
  
  # Check if client files exist
  if [ ! -d ".nuxt/dist/client" ]; then
    echo "ERROR: Build failed! .nuxt/dist/client directory not found."
    echo "Checking .nuxt/dist contents:"
    ls -la .nuxt/dist/ || echo ".nuxt/dist directory doesn't exist"
    exit 1
  fi
  
  echo "Build completed successfully!"
  echo "Build output location: .nuxt/dist/client"
  echo "Checking for _nuxt files:"
  ls -la .nuxt/dist/client/ | head -10 || echo "No files found in .nuxt/dist/client"
fi

# Verify .nuxt/dist/client exists before starting
if [ ! -d ".nuxt/dist/client" ]; then
  echo "ERROR: .nuxt/dist/client directory is missing! Cannot start production server."
  exit 1
fi

# Start production server
echo "Starting Nuxt production server..."
echo "Server will serve files from: .nuxt/dist/client"
exec npm run start

