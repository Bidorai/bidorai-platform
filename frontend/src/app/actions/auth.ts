// src/app/actions/auth.ts
'use server'

import { signOut } from '@clerk/nextjs/server'

export async function signOutUser() {
  await signOut()
}
