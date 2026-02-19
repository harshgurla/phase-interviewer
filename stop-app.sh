#!/bin/bash

echo "🛑 Stopping Phase Assistant Application..."

# Kill server process
echo "Stopping backend server..."
pkill -f "node.*server.js"

# Kill client process
echo "Stopping frontend client..."
pkill -f "vite"

sleep 2

# Verify processes are stopped
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Backend still running, force killing..."
    lsof -ti:5000 | xargs kill -9 2>/dev/null
fi

if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Frontend still running, force killing..."
    lsof -ti:5173 | xargs kill -9 2>/dev/null
fi

echo "✅ Application stopped successfully!"
