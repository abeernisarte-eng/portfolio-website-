#!/bin/sh
set -e

echo "Applying database schema..."
npx prisma db push

if [ "$SEED_DATABASE" = "true" ]; then
  echo "Seeding database..."
  npm run prisma:seed
fi

echo "Starting API server..."
node dist/server.js
