import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAuthUser } from './app/actions/auth-actions';


export async function middleware(req: NextRequest) {
  const user = await getAuthUser()

  if (req.nextUrl.pathname.startsWith('/auth')) {
    return !!user 
      ? NextResponse.redirect(new URL('/', req.url))
      : NextResponse.next();
  }

  if (!user) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
};
