import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define protected routes
  const isProtected = 
    path.startsWith('/dashboard') || 
    path.startsWith('/portfolio') || 
    path.startsWith('/finances') || 
    path.startsWith('/knowledge') || 
    path.startsWith('/projects');

  // NOTE: In a real production app with Firebase, you would check for a 
  // session cookie here (set via firebase-admin on login).
  // Since we are using client-side auth, we cannot securely verify the user 
  // in middleware without that cookie.
  // For now, we rely on the AdminLayout client-side check.
  
  // Example of how you would redirect if you had a session cookie:
  // const session = request.cookies.get('session');
  // if (isProtected && !session) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/portfolio/:path*',
    '/finances/:path*',
    '/knowledge/:path*',
    '/projects/:path*',
  ],
};
