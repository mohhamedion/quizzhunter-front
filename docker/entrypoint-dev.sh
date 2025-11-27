#!/bin/sh
set -e

# Run Nuxt directly (Node 14 doesn't need openssl-legacy-provider flag)
# The flag is only needed for Node 17+ with OpenSSL 3.0
exec node node_modules/.bin/nuxt
