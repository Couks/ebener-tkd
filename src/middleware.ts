import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'your-fallback-secret-key-for-development';
const COOKIE_NAME = 'authToken';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get(COOKIE_NAME)?.value;

  // Define admin paths that require authentication
  const isAdminPath = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  let isTokenValid = false;
  if (authToken) {
    try {
      await jwtVerify(authToken, new TextEncoder().encode(SECRET_KEY));
      isTokenValid = true;
    } catch (err) {
      isTokenValid = false;
    }
  }

  // If trying to access a protected admin page without a valid token, redirect to login
  if (isAdminPath && !isLoginPage && !isTokenValid) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname); // Optional: redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // If logged in and trying to access the login page, redirect to the admin dashboard
  if (isLoginPage && isTokenValid) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // If token is invalid or expired, clear the cookie and let the redirect handle it
  if (isAdminPath && authToken && !isTokenValid) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
  }

  return NextResponse.next();
}

export const config = {
  // Match all admin routes except for API routes, static files, and the login page itself
  matcher: ['/admin/:path*'],
};
