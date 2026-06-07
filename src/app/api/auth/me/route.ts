import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJWT } from '../../../../lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const session = await verifyJWT(token);

    if (!session) {
      return NextResponse.json({ error: 'Sesión inválida o expirada' }, { status: 401 });
    }

    return NextResponse.json({ user: session });
  } catch (error) {
    console.error('Session retrieval error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
