#!/bin/sh
set -e

# Build script that works with Node 14 (no openssl-legacy-provider needed)
# Node 14 doesn't need the --openssl-legacy-provider flag
# This flag is only needed for Node 17+ with OpenSSL 3.0

echo "Building Nuxt application..."
node node_modules/.bin/nuxt build

