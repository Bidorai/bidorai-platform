// src/middleware.ts - Correct for Clerk v5.7.5
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/bidding(.*)',
  '/dashboard(.*)',
  '/profile(.*)',
  '/cart(.*)',
  '/orders(.*)',
])

export default clerkMiddleware((auth, req) => {
  // For protected routes, check authentication
  if (isProtectedRoute(req)) {
    const { userId } = auth()
    
    if (!userId) {
      // Redirect to sign-in page
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return NextResponse.redirect(signInUrl)
    }
  }
  
  // Allow the request to continue
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}