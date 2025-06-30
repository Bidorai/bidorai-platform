# PowerShell script to set up environment variables for Bidorai Customer Portal

Write-Host "Setting up environment variables for Bidorai Customer Portal..." -ForegroundColor Green

# Create .env.local file content
$envContent = @"
# Clerk Authentication (Required for customer portal)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# Google Maps API (Required for location autocomplete)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# API URL (Backend server)
NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional: Clerk configuration
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
"@

# Write to .env.local file
$envContent | Out-File -FilePath ".env.local" -Encoding UTF8

Write-Host "Created .env.local file with template values." -ForegroundColor Yellow
Write-Host "Please edit .env.local and replace the placeholder values with your actual API keys:" -ForegroundColor Yellow
Write-Host "1. Get Clerk keys from: https://dashboard.clerk.com/" -ForegroundColor Cyan
Write-Host "2. Get Google Maps API key from: https://console.cloud.google.com/" -ForegroundColor Cyan
Write-Host "3. Update the values in .env.local file" -ForegroundColor Cyan
Write-Host "4. Restart the development server with: npm run dev" -ForegroundColor Green 