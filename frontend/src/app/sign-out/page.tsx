// src/app/sign-out/page.tsx
import { redirect } from 'next/navigation'
import { clerkClient } from '@clerk/nextjs/server'

export default async function SignOutPage() {
  const client = await clerkClient()
  await client.sessions.endCurrentSession()
  redirect('/')
}
