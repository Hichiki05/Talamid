import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userRole = request.cookies.get('userRole')?.value || 'guest';
  const { pathname } = request.nextUrl;

  const isProtectedPage = 
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/exercices') ||
    pathname.startsWith('/profile');


  if (userRole === 'guest' && isProtectedPage) {
    return NextResponse.redirect(new URL('/subscription', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/exercices/:path*', '/profile/:path*'],
};