@echo off
echo Starting Bidorai Platform in development mode...

echo Creating necessary directories...
mkdir uploads 2>nul

:: Install backend dependencies
echo Installing backend dependencies...
cd backend
npm install

:: Install frontend dependencies
echo Installing frontend dependencies...
cd ../frontend
npm install

:: Start backend server in a new window
echo Starting backend server...
start cmd /k "cd ../backend && npm run dev"

:: Wait a moment for backend to start
timeout /t 5

:: Start frontend server in a new window
echo Starting frontend server...
start cmd /k "npm run dev"

echo All services started. Access the app at:
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000

:: Check if ports are available
echo Checking if ports are available...
netstat -ano | findstr :3000 >nul
if not errorlevel 1 (
    echo Port 3000 is available
) else (
    echo WARNING: Port 3000 might be in use
)

netstat -ano | findstr :5000 >nul
if not errorlevel 1 (
    echo Port 5000 is available
) else (
    echo WARNING: Port 5000 might be in use
)

pause
