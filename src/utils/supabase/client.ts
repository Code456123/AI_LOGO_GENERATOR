import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_DATABASE_URL!,
    process.env.NEXT_PUBLIC_DATABASE_PUBLISHABLE_KEY!
  )
}
