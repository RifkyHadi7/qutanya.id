import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Daftar halaman yang tidak memerlukan sesi
  const publicPaths = ['/loginpage', '/register'];

  // Jika pengguna mencoba mengakses halaman login atau register, izinkan
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Periksa apakah sesi ada di cookies
  const session = request.cookies.get('session');

  // Jika sesi tidak ada, arahkan ke halaman login
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = '/loginpage';
    return NextResponse.redirect(url);
  }

  // Jika sesi ada, izinkan akses
  return NextResponse.next();
}

// Tentukan rute mana yang akan menggunakan middleware ini
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};