import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET_KEY = process.env.JWT_SECRET || 'your-fallback-secret-key-for-development'; // Use environment variable
const COOKIE_NAME = 'authToken';
const MAX_AGE = 60 * 60 * 24 * 7; // 1 week in seconds

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const username = body.get('username');
    const password = body.get('password');

    // Simple hardcoded validation
    if (username === 'ebener' && password === 'tkd2025') {
      // Create a JWT token
      const token = sign({ username }, SECRET_KEY, {
        expiresIn: MAX_AGE,
      });

      // Serialize the cookie
      const seralized = serialize(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: MAX_AGE,
        path: '/',
      });

      // Return success response with the cookie
      return NextResponse.json({ message: 'Login bem-sucedido!' }, {
        status: 200,
        headers: {
          'Set-Cookie': seralized,
        },
      });
    }

    // Return error for invalid credentials
    return NextResponse.json({ message: 'Credenciais inválidas.' }, { status: 401 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Ocorreu um erro interno.' }, { status: 500 });
  }
}
