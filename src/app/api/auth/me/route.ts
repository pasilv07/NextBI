import { NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const sessionPayload = {
      email: user.email,
      name: user.user_metadata?.name || user.email?.split('@')[0] || 'Usuario',
      role: user.user_metadata?.role || 'Analista'
    };

    return NextResponse.json({ user: sessionPayload });
  } catch (error) {
    console.error('Session retrieval error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
