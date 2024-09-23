import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';


export function middleware(req: NextRequest) {
  const token = jwt.decode(cookies().get('token')?.value)

  if (req.nextUrl.pathname.startsWith('/auth')) {
    return !!token 
      ? NextResponse.redirect(new URL('/', req.url))
      : NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
};
