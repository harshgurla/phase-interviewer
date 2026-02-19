#!/bin/bash

echo "🔍 Phase Assistant Status Check"
echo "================================"

# Check backend
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Backend Server: RUNNING on port 5000"
    echo "   PID: $(lsof -ti:5000)"
else
    echo "❌ Backend Server: NOT RUNNING"
fi

# Check frontend
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Frontend Client: RUNNING on port 5173"
    echo "   PID: $(lsof -ti:5173)"
else
    echo "❌ Frontend Client: NOT RUNNING"
fi

echo "================================"
