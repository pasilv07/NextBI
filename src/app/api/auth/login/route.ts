import { NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: 'Credenciales inválidas. Intente de nuevo.' },
        { status: 401 }
      );
    }

    const sessionPayload = {
      email: data.user.email,
      name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'Usuario',
      role: data.user.user_metadata?.role || 'Analista'
    };

    return NextResponse.json({ success: true, user: sessionPayload });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
