#!/bin/sh
set -e

# For development mode, run Nuxt dev server
# The NODE_OPTIONS flag is handled in package.json scripts
echo "Starting Nuxt development server..."
exec npm run dev
