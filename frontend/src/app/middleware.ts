// frontend/src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/bidding(.*)',
  '/dashboard(.*)',
  '/profile(.*)',
  '/cart(.*)',
  '/orders(.*)',
])

const isPublicRoute = createRouteMatcher([
  '/',
  '/browse(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/how-it-works',
  '/restaurants',
  '/about',
  '/contact',
  '/api/webhooks(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // Always allow access to public routes
  if (isPublicRoute(req)) {
    return
  }
  
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}