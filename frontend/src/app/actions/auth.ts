// src/app/actions/auth.ts
'use server'

import { getAuth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function signOutUser() {
  const { sessionId } = await getAuth({ headers: { authorization: 'token' } } as any)
  if (sessionId) {
    // Use Clerk's built-in sign-out functionality
    return redirect('/sign-out')
  }
}
