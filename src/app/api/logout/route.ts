import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

const COOKIE_NAME = 'authToken';

export async function POST(request: Request) {
  // To log out, we clear the cookie by setting its maxAge to -1
  const seralized = serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1, // Expire the cookie immediately
    path: '/',
  });

  return NextResponse.json({ message: 'Logout bem-sucedido!' }, {
    status: 200,
    headers: {
      'Set-Cookie': seralized,
    },
  });
}
