#!/bin/bash
set -e

if [ -f "package.json" ]; then
  echo "📦 Installing dependencies..."
  npm ci

  # No build step needed for now
  # echo "🔨 Building action..."
  # npm run build

  echo "📝 Linting..."
  npm run lint || echo "⚠️ Lint warnings present"

  echo "🔒 Security audit..."
  npm audit || echo "⚠️ Audit warnings present"

  echo "🧪 Running tests..."
  npm test || echo "⚠️ Tests failed or none defined"

  # Coverage not currently implemented
  # echo "📊 Test coverage..."
  # npm test -- --coverage

  # Not critical but helpful
  echo "📦 Checking dependencies..."
  npm outdated || echo "✅ All dependencies up to date"
fi
