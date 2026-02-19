#!/bin/bash

echo "🚀 Starting Phase Assistant Application..."

# Function to check if process is running
check_process() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "✅ Process already running on port $1"
        return 0
    else
        return 1
    fi
}

# Kill existing processes if any
echo "🧹 Cleaning up existing processes..."
pkill -f "node.*server.js" 2>/dev/null
pkill -f "vite" 2>/dev/null
sleep 2

# Start Backend Server
echo "📦 Starting Backend Server on port 5000..."
cd /home/navgurukul/Desktop/phase-assistant/server
npm start > ../logs/server.log 2>&1 &
SERVER_PID=$!
echo "Backend PID: $SERVER_PID"

# Wait for server to start
sleep 3
if check_process 5000; then
    echo "✅ Backend server started successfully!"
else
    echo "❌ Failed to start backend server. Check logs/server.log"
    exit 1
fi

# Start Frontend Client
echo "🎨 Starting Frontend Client on port 5173..."
cd /home/navgurukul/Desktop/phase-assistant/client
npm run dev > ../logs/client.log 2>&1 &
CLIENT_PID=$!
echo "Frontend PID: $CLIENT_PID"

# Wait for client to start
sleep 3
if check_process 5173; then
    echo "✅ Frontend client started successfully!"
else
    echo "❌ Failed to start frontend client. Check logs/client.log"
    exit 1
fi

echo ""
echo "🎉 Application started successfully!"
echo "=================================="
echo "📊 Backend API: http://localhost:5000"
echo "🌐 Frontend UI: http://localhost:5173"
echo "=================================="
echo ""
echo "📝 Logs:"
echo "   Server: logs/server.log"
echo "   Client: logs/client.log"
echo ""
echo "To stop: ./stop-app.sh"
