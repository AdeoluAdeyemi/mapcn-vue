#!/bin/bash

# mapcn-vue Installation Script
# This script helps set up the Vue 3 version of mapcn

echo "🗺️  mapcn-vue Setup"
echo "==================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Start development server: npm run dev"
echo "  2. Open http://localhost:5173 in your browser"
echo "  3. Check out QUICK_START.md for usage examples"
echo ""
echo "Happy mapping! 🗺️"
