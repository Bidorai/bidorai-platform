# Environment Setup for Bidovio Customer Portal

## Required Environment Variables

Create a file named `.env.local` in the `frontend/customer` directory with the following content:

```env
# Clerk Authentication (Required for customer portal)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_anVzdC1wbGF0eXB1cy05My5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_a6qqIJjmIYvtB2FuZkyqkIFDFdlq30Oo4o9Qg62hdB

# Google Maps API (Required for location autocomplete)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyAnF9n7pb6PeoOt6rszX0oEzRr0l9Gn_zk

# API URL (Backend server)
NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional: Clerk configuration
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## How to Get API Keys

### 1. Clerk Authentication Keys
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application or select existing one
3. Go to API Keys section
4. Copy the Publishable Key and Secret Key
5. Replace the placeholder values in `.env.local`

### 2. Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Maps JavaScript API and Places API
4. Create credentials (API Key)
5. Replace the placeholder value in `.env.local`

## After Setup

1. Save the `.env.local` file
2. Restart the development server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000 in your browser
4. The UI should now display properly with all styling

## Troubleshooting

If you still see only text without styling:
1. Check browser console for errors (F12)
2. Ensure all environment variables are set correctly
3. Clear browser cache and hard refresh (Ctrl+Shift+R)
4. Restart the development server 