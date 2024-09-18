import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Daftar halaman yang tidak memerlukan sesi
  const publicPaths = ['/loginpage', '/register', '/lupapassword', '/konfirmasi', '/passwordchange'];
  
  const session = request.cookies.get('session');

  // Log untuk membantu debug
  // Jika ada sesi dan mencoba mengakses halaman login, register, atau lupa password, arahkan ke halaman beranda
  if (session && publicPaths.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/beranda';
    const response = NextResponse.redirect(url);
    response.headers.set('Access-Control-Allow-Origin', '*'); // Mengizinkan semua origin, sesuaikan sesuai kebutuhan
    return response;
  }

  // Jika tidak ada sesi dan mencoba mengakses halaman yang memerlukan sesi, arahkan ke halaman login
  if (!session && !publicPaths.includes(pathname)) {  
    const url = request.nextUrl.clone();
    url.pathname = '/loginpage';
    const response = NextResponse.redirect(url);
    response.headers.set('Access-Control-Allow-Origin', '*'); // Mengizinkan semua origin, sesuaikan sesuai kebutuhan
    return response;
  }

  // Izinkan akses ke halaman yang sesuai dengan aturan di atas
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', '*'); // Mengizinkan semua origin, sesuaikan sesuai kebutuhan
  return response;
}

// Tentukan rute mana yang akan menggunakan middleware ini
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|loginpage|register|lupapassword).*)',
  ],
};
