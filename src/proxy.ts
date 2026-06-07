import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from './lib/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value;

  // Define route checkers
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isLoginRoute = pathname === '/login';
  const isRootRoute = pathname === '/';

  // Verify the JWT token
  let session = null;
  if (token) {
    session = await verifyJWT(token);
  }

  // 1. If trying to access dashboard but not authenticated
  if (isDashboardRoute && !session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    
    // Clear cookie just in case it was invalid/expired
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('auth_token');
    return response;
  }

  // 2. If trying to access login page but already logged in
  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. If accessing root, redirect to dashboard
  if (isRootRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Config to specify matching paths
export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard/:path*',
  ],
};
