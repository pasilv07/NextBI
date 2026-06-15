'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<'admin' | 'analista'>('admin');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const email = selectedRole === 'admin' ? 'admin@walter.com.py' : 'analista@walter.com.py';
    const password = selectedRole === 'admin' ? 'admin123' : 'analista123';

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Algo salió mal');
      }

      // Successful login
      const redirect = searchParams.get('redirect') || '/dashboard';
      router.replace(redirect);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Error de conexión');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {error && (
        <div className="alert al-r" style={{ marginBottom: '16px' }}>
          <span>●</span>
          <span>{error}</span>
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Seleccionar Perfil</label>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
          <button
            type="button"
            onClick={() => setSelectedRole('admin')}
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              border: selectedRole === 'admin' ? '2px solid var(--text)' : '1px solid var(--border)',
              background: selectedRole === 'admin' ? 'var(--blue-bg)' : 'rgba(255, 255, 255, 0.8)',
              color: 'var(--text)',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              fontFamily: 'inherit',
              transition: 'var(--transition)'
            }}
          >
            <strong style={{ fontSize: '13px' }}>Administrador</strong>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>admin@walter.com.py (Acceso Total)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('analista')}
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              border: selectedRole === 'analista' ? '2px solid var(--text)' : '1px solid var(--border)',
              background: selectedRole === 'analista' ? 'var(--blue-bg)' : 'rgba(255, 255, 255, 0.8)',
              color: 'var(--text)',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              fontFamily: 'inherit',
              transition: 'var(--transition)'
            }}
          >
            <strong style={{ fontSize: '13px' }}>Analista</strong>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>analista@walter.com.py (Vista y Consultas)</span>
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={isLoading}
        style={{ marginTop: '8px' }}
      >
        {isLoading ? 'Iniciando sesión...' : `Iniciar Sesión como ${selectedRole === 'admin' ? 'Administrador' : 'Analista'}`}
      </button>

      <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center' }}>
        Las credenciales de Supabase se validan de forma automática en el servidor.
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="login-bg">
      <div className="login-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <div className="logo" style={{ width: '36px', height: '36px', fontSize: '16px' }}>W</div>
          <div>
            <h1 className="login-title">Walter S.A.</h1>
            <p className="login-sub" style={{ margin: 0 }}>Business Intelligence & Control</p>
          </div>
        </div>
        
        <Suspense fallback={<div>Cargando formulario...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
