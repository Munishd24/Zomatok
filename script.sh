#!/bin/bash
set -e

# run backend in background and save PID
( cd backend && npm run dev ) > backend.log 2>&1 &
BACKEND_PID=$!

# run frontend in background and save PID
( cd frontend && npm run dev ) > frontend.log 2>&1 &
FRONTEND_PID=$!

# optional: show PIDs
echo "backend PID: $BACKEND_PID"
echo "frontend PID: $FRONTEND_PID"

# wait for both to exit (so the script doesn't immediately terminate)
wait $BACKEND_PID $FRONTEND_PID

