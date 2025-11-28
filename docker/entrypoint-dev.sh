#!/bin/sh
set -e

# For development mode, run Nuxt dev server
# Node 14 doesn't allow NODE_OPTIONS=--openssl-legacy-provider, so run nuxt directly
echo "Starting Nuxt development server..."
exec node node_modules/.bin/nuxt
