@echo off
echo Starting fresh setup of Bidorai Platform...

echo Cleaning up existing containers...
docker stop bidorai-db bidorai-redis 2>nul
docker rm bidorai-db bidorai-redis 2>nul

echo Creating necessary directories...
if not exist uploads mkdir uploads
if not exist frontend\.next rmdir /s /q frontend\.next

:: Start PostgreSQL
echo Starting PostgreSQL...
docker run --name bidorai-db -e POSTGRES_PASSWORD=postgres -d postgres:15

:: Wait for PostgreSQL to start
timeout /t 10

echo Initializing database...
docker exec -i bidorai-db psql -U postgres < database\init-db.sql

:: Start Redis
echo Starting Redis...
docker run --name bidorai-redis -d redis:7

:: Install and start backend
echo Installing backend dependencies...
cd backend
npm install

echo Starting backend server...
start cmd /k "npm run dev"

cd ..

:: Wait for backend to start
timeout /t 5

:: Install and start frontend
echo Installing frontend dependencies...
cd frontend
npm install

echo Starting frontend server...
start cmd /k "npm run dev"

echo Setup complete!
echo Access the app at:
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
pause
