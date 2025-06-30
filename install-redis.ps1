# Redis Installation Script for Windows
# This script helps install Redis locally

Write-Host "Redis Installation Script for Windows" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Check if Chocolatey is installed
Write-Host "Checking if Chocolatey is installed..." -ForegroundColor Yellow
try {
    choco --version | Out-Null
    Write-Host "Chocolatey is installed." -ForegroundColor Green
} catch {
    Write-Host "Chocolatey is not installed. Installing Chocolatey..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
}

# Install Redis
Write-Host "Installing Redis..." -ForegroundColor Yellow
choco install redis-64 -y

# Check if Redis was installed successfully
try {
    redis-server --version | Out-Null
    Write-Host "Redis installed successfully!" -ForegroundColor Green
    Write-Host "To start Redis server, run: redis-server" -ForegroundColor Cyan
    Write-Host "To test Redis connection, run: redis-cli ping" -ForegroundColor Cyan
} catch {
    Write-Host "Failed to install Redis via Chocolatey. Trying alternative method..." -ForegroundColor Red
    
    # Alternative: Download Redis for Windows
    Write-Host "Downloading Redis for Windows..." -ForegroundColor Yellow
    $redisUrl = "https://github.com/microsoftarchive/redis/releases/download/win-3.0.504/Redis-x64-3.0.504.msi"
    $redisInstaller = "$env:TEMP\Redis-x64-3.0.504.msi"
    
    try {
        Invoke-WebRequest -Uri $redisUrl -OutFile $redisInstaller
        Write-Host "Downloaded Redis installer. Installing..." -ForegroundColor Yellow
        Start-Process msiexec.exe -Wait -ArgumentList "/i $redisInstaller /quiet"
        Write-Host "Redis installed successfully!" -ForegroundColor Green
    } catch {
        Write-Host "Failed to install Redis automatically." -ForegroundColor Red
        Write-Host "Please install Redis manually:" -ForegroundColor Yellow
        Write-Host "1. Download from: https://github.com/microsoftarchive/redis/releases" -ForegroundColor Cyan
        Write-Host "2. Or use Docker: docker run -d -p 6379:6379 redis:7" -ForegroundColor Cyan
    }
}

Write-Host "`nNext steps:" -ForegroundColor Green
Write-Host "1. Start Redis server: redis-server" -ForegroundColor Cyan
Write-Host "2. Test connection: redis-cli ping" -ForegroundColor Cyan
Write-Host "3. Start your application" -ForegroundColor Cyan 