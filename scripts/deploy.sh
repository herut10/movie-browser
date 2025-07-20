#!/bin/bash

# Deploy script for GitHub Pages

echo "🚀 Starting deployment..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Create .nojekyll file to bypass GitHub Pages Jekyll processing
echo "📝 Creating .nojekyll file..."
touch dist/.nojekyll

echo "🎉 Deployment ready!"
echo "📁 The 'dist' folder is ready for deployment"
echo "🌐 Upload the contents of 'dist' to your hosting service" 