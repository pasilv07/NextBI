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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {error && (
        <div className="alert al-r" style={{ marginBottom: '16px' }}>
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
          placeholder="admin@walter.com.py"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="form-group" style={{ marginBottom: '24px' }}>
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

      <div style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '16px', fontSize: '11px', color: 'var(--text-secondary)' }}>
        <p style={{ marginBottom: '4px' }}><strong>Credenciales de demostración:</strong></p>
        <p>Administrador: <code>admin@walter.com.py</code> / <code>admin123</code></p>
        <p>Analista: <code>analista@walter.com.py</code> / <code>analista123</code></p>
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="login-bg">
      <div className="login-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
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
