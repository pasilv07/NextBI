import { NextResponse } from 'next/server';
import { signJWT } from '../../../../lib/auth';

const MOCK_USERS = [
  { email: 'admin@walter.com.py', password: 'admin123', name: 'Admin Walter S.A.', role: 'Administrador' },
  { email: 'analista@walter.com.py', password: 'analista123', name: 'Analista BI', role: 'Analista' }
];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = MOCK_USERS.find(u => u.email === email.toLowerCase().trim() && u.password === password);

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales inválidas. Intente con admin@walter.com.py / admin123' },
        { status: 401 }
      );
    }

    const sessionPayload = {
      email: user.email,
      name: user.name,
      role: user.role
    };

    const token = await signJWT(sessionPayload);

    // Create the response and set the httpOnly cookie
    const response = NextResponse.json({ success: true, user: sessionPayload });
    
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
