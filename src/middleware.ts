import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Next.js requires the middleware function to be a DEFAULT export
// named exactly "middleware" in a file called "middleware.ts"
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the user session on every request (keeps cookies up to date)
  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  const isLoginRoute = pathname === '/login';
  const isRootRoute = pathname === '/';

  // 1. If already logged in and trying to visit /login → send to dashboard
  if (isLoginRoute && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. Root / → always redirect to /dashboard
  if (isRootRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. Trying to access /dashboard/* without being logged in → send to /login
  if (pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

// Only run middleware on these paths (not on static files, images, etc.)
export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard/:path*',
  ],
};
