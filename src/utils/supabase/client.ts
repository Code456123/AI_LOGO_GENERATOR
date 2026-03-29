import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_DATABASE_URL!,
    process.env.NEXT_PUBLIC_DATABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          if (typeof document === 'undefined') return null
          const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
          return match ? decodeURIComponent(match[2]) : null
        },
        set(name: string, value: string, options: any) {
          if (typeof document === 'undefined') return
          let cookieStr = `${name}=${encodeURIComponent(value)}; path=${options.path || '/'}; samesite=${options.sameSite || 'Lax'}`
          if (options.domain) cookieStr += `; domain=${options.domain}`
          if (options.secure) cookieStr += '; secure'
          document.cookie = cookieStr
        },
        remove(name: string, options: any) {
          if (typeof document === 'undefined') return
          let cookieStr = `${name}=; path=${options.path || '/'}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
          if (options.domain) cookieStr += `; domain=${options.domain}`
          document.cookie = cookieStr
        }
      }
    }
  )
}
