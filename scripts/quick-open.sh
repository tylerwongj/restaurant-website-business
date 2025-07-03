#!/bin/bash

# Quick script to open all client websites
# Usage: ./quick-open.sh

echo "🌐 Opening all client websites..."

# Base directory
BASE_DIR="/Users/tyler/p2/restaurant-website-business/client-projects"

# Find and open all index.html files
find "$BASE_DIR" -path "*/generated/website/index.html" -exec echo "Opening: {}" \; -exec open {} \; -exec sleep 0.5 \;

# Also check for website-fixed directories
find "$BASE_DIR" -path "*/generated/website-fixed/index.html" -exec echo "Opening (fixed): {}" \; -exec open {} \; -exec sleep 0.5 \;

echo "✅ Done! Check your browser tabs."