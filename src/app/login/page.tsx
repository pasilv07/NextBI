'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent, customEmail?: string, customPassword?: string) => {
    if (e) e.preventDefault();
    setError(null);
    setIsLoading(true);

    const finalEmail = customEmail || email;
    const finalPassword = customPassword || password;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: finalEmail, password: finalPassword })
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

  const handleQuickLogin = (role: 'admin' | 'analista') => {
    const qEmail = role === 'admin' ? 'admin@walter.com.py' : 'analista@walter.com.py';
    const qPassword = role === 'admin' ? 'admin123' : 'analista123';
    setEmail(qEmail);
    setPassword(qPassword);
    handleSubmit(undefined, qEmail, qPassword);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {error && (
        <div className="alert al-r" style={{ marginBottom: '8px' }}>
          <span>●</span>
          <span>{error}</span>
        </div>
      )}

      <div className="form-group">
        <label className="form-label" htmlFor="email">Usuario / Correo</label>
        <input
          id="email"
          type="email"
          className="form-input"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="form-group" style={{ marginBottom: '8px' }}>
        <label className="form-label" htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          className="form-input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={isLoading}
      >
        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>

      <div style={{ marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
        <label className="form-label" style={{ display: 'block', marginBottom: '8px', textAlign: 'center' }}>
          Acceso Rápido (Demostración)
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => handleQuickLogin('admin')}
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '10px 8px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              background: 'rgba(255, 255, 255, 0.8)',
              color: 'var(--text)',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'var(--transition)',
              textAlign: 'center'
            }}
          >
            Administrador
          </button>
          
          <button
            type="button"
            onClick={() => handleQuickLogin('analista')}
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '10px 8px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              background: 'rgba(255, 255, 255, 0.8)',
              color: 'var(--text)',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'var(--transition)',
              textAlign: 'center'
            }}
          >
            Analista
          </button>
        </div>
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
