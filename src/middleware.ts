import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Cookies from 'js-cookie';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const paths = ['/login', '/signup'];
  const userToken = request.cookies.get('token')?.value;
  if (!!userToken && paths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/signup']
};
