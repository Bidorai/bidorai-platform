@echo off
echo Starting Bidorai Platform...

:: Create necessary directories
mkdir uploads 2>nul

:: Check if PostgreSQL is running
docker ps | findstr "postgres" >nul
if errorlevel 1 (
    echo Starting PostgreSQL...
    docker run --name bidorai-db -e POSTGRES_PASSWORD=postgres -d postgres:15
)

:: Check if Redis is running
docker ps | findstr "redis" >nul
if errorlevel 1 (
    echo Starting Redis...
    docker run --name bidorai-redis -d redis:7
)

echo Initializing database...
docker exec -i bidorai-db psql -U postgres < database\init-db.sql 2>nul

:: Start backend in a new window
echo Starting backend server...
start cmd /k "cd backend && npm install && npm run dev"

:: Wait a moment for backend to start
timeout /t 5

:: Start frontend in a new window
echo Starting frontend server...
start cmd /k "cd frontend && npm install && npm run dev"

echo All services started. Access the app at:
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
pause
