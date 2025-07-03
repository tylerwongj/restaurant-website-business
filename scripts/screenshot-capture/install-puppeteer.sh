#!/bin/bash

# Install Puppeteer for screenshot capture
# This script installs puppeteer and its dependencies

echo "🚀 Installing Puppeteer for screenshot capture..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Navigate to project root
cd "$(dirname "$0")/../.."

# Initialize package.json if it doesn't exist
if [ ! -f "package.json" ]; then
    echo "📦 Creating package.json..."
    npm init -y
fi

# Install puppeteer
echo "📦 Installing Puppeteer..."
npm install puppeteer

if [ $? -eq 0 ]; then
    echo "✅ Puppeteer installed successfully!"
    echo ""
    echo "🎯 You can now run the screenshot capture script:"
    echo "   node scripts/screenshot-capture/capture-reference-screenshots.js"
    echo ""
    echo "📁 Screenshots will be saved to: references/images/"
else
    echo "❌ Failed to install Puppeteer"
    exit 1
fi