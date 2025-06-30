# Redis Setup Guide

## Problem
Your application is showing Redis connection errors because Redis is not running or not accessible.

## Solutions

### Option 1: Use Docker (Recommended)

1. **Install Docker Desktop for Windows**
   - Download from: https://www.docker.com/products/docker-desktop/
   - Install and restart your computer

2. **Start the services**
   ```bash
   docker compose up -d
   ```

3. **Verify Redis is running**
   ```bash
   docker ps
   ```
   You should see a Redis container running.

### Option 2: Install Redis Locally

1. **Run the installation script**
   ```powershell
   .\install-redis.ps1
   ```

2. **Or install manually**
   - Download Redis for Windows from: https://github.com/microsoftarchive/redis/releases
   - Install the MSI file
   - Start Redis server: `redis-server`

3. **Test Redis connection**
   ```bash
   redis-cli ping
   ```
   Should return "PONG"

### Option 3: Use Redis Cloud (Free Tier)

1. **Sign up for Redis Cloud**
   - Go to: https://redis.com/try-free/
   - Create a free account

2. **Get your Redis URL**
   - Copy the connection string from your Redis Cloud dashboard

3. **Set environment variable**
   ```bash
   set REDIS_URL=redis://your-redis-cloud-url
   ```

## Current Status

The application has been updated to handle Redis unavailability gracefully:

- ✅ **Graceful fallback**: If Redis is not available, the app continues to work using database-only operations
- ✅ **Better error handling**: Reduced error noise in development mode
- ✅ **Reconnection strategy**: Automatic retry with exponential backoff
- ✅ **Fallback logic**: Bidding service falls back to database queries when Redis is unavailable

## Testing

1. **Start your application**
   ```bash
   cd backend
   npm run dev
   ```

2. **Check the logs**
   - You should see either "Redis connected" or a warning about Redis unavailability
   - The application should start successfully in both cases

3. **Test functionality**
   - The bidding features will work with or without Redis
   - Performance may be slightly slower without Redis caching

## Troubleshooting

### Docker Issues
- Make sure Docker Desktop is running
- Check if ports 6379 and 5432 are available
- Try: `docker compose down && docker compose up -d`

### Local Redis Issues
- Check if Redis is running: `redis-cli ping`
- Check if port 6379 is available: `netstat -an | findstr 6379`
- Restart Redis: `redis-server`

### Connection Issues
- Verify Redis URL in environment variables
- Check firewall settings
- Try connecting manually: `redis-cli -h localhost -p 6379`

## Environment Variables

Set these environment variables if needed:

```bash
# For local Redis
set REDIS_URL=redis://localhost:6379

# For Docker Redis
set REDIS_URL=redis://redis:6379

# For Redis Cloud
set REDIS_URL=redis://your-redis-cloud-url
```

## Next Steps

1. Choose one of the Redis setup options above
2. Start your application
3. Verify Redis connection in the logs
4. Test the bidding functionality

The application will work without Redis, but Redis improves performance for real-time bidding features. 