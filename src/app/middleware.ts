// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabaseMiddleware'

export async function middleware(request: NextRequest) {
  const { user, response } = await updateSession(request)
  const { pathname } = request.nextUrl

  // ==================== DEBUGGING LOG ====================
  console.log(`[Middleware] Path: ${pathname}, User: ${user ? user.email : 'null'}`)
  // =======================================================

  if (!user && pathname === '/dashboard') {
    console.log('[Middleware] No user found, redirecting to /login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && pathname === '/login') {
    console.log('[Middleware] User found, redirecting to /dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  // ... your config remains the same
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}