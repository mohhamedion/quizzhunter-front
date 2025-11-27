#!/bin/sh
# Script to check if build completed successfully

echo "=== Checking Nuxt Build Status ==="
echo ""

# Check if .nuxt exists
if [ ! -d ".nuxt" ]; then
  echo "❌ ERROR: .nuxt directory does not exist!"
  exit 1
fi

echo "✅ .nuxt directory exists"

# Check if dist exists
if [ ! -d ".nuxt/dist" ]; then
  echo "❌ ERROR: .nuxt/dist directory does not exist!"
  echo "Contents of .nuxt:"
  ls -la .nuxt/
  exit 1
fi

echo "✅ .nuxt/dist directory exists"

# Check if client exists
if [ ! -d ".nuxt/dist/client" ]; then
  echo "❌ ERROR: .nuxt/dist/client directory does not exist!"
  echo "Contents of .nuxt/dist:"
  ls -la .nuxt/dist/
  exit 1
fi

echo "✅ .nuxt/dist/client directory exists"

# Count files in client directory
FILE_COUNT=$(find .nuxt/dist/client -type f | wc -l)
echo "📁 Found $FILE_COUNT files in .nuxt/dist/client"

# List some files
echo ""
echo "Sample files in .nuxt/dist/client:"
ls -lh .nuxt/dist/client/ | head -10

# Check for key files
if [ -f ".nuxt/dist/client/app.js" ]; then
  echo "✅ app.js exists"
else
  echo "⚠️  WARNING: app.js not found"
fi

if [ -f ".nuxt/dist/client/app.css" ] || [ -f ".nuxt/dist/client/app.css.map" ]; then
  echo "✅ CSS files exist"
else
  echo "⚠️  WARNING: CSS files not found"
fi

echo ""
echo "=== Build Check Complete ==="

