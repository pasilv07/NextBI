'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import UserDropdown from './UserDropdown';
import FilterBar from './FilterBar';
import { useData } from '../lib/DataContext';

export default function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { loading, error } = useData();

  // Helper to build URLs preserving current query filters
  const getNavUrl = (basePath: string) => {
    const params = searchParams.toString();
    return `${basePath}${params ? '?' + params : ''}`;
  };

  const navItems = [
    { label: 'P&L por sucursal', path: '/dashboard' },
    { label: 'Mes a mes', path: '/dashboard/mes-a-mes' },
    { label: 'Ranking & alertas', path: '/dashboard/ranking' },
    { label: 'Waterfall', path: '/dashboard/waterfall' },
  ];

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
        color: 'var(--text-secondary)',
        backgroundColor: 'var(--bg)'
      }}>
        Conectando a Supabase y cargando datos...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
        color: 'var(--text-secondary)',
        backgroundColor: 'var(--bg)',
        padding: '24px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: 'var(--text-bad)', marginBottom: '8px' }}>Error de Conexión</h2>
        <p style={{ maxWidth: '400px', fontSize: '14px', marginBottom: '16px' }}>{error}</p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Asegúrate de haber corrido el SQL en tu panel de Supabase y de tener las variables correctas en tu archivo `.env`.
        </p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Upper Navigation Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">W</div>
          <div>
            <div className="h-title">Walter S.A. — La Consolidada</div>
            <div className="h-sub">Presupuesto 2026 · 6 sucursales</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="nav">
          {navItems.map(item => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={getNavUrl(item.path)}
                className={`nav-btn ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Account Menu */}
        <UserDropdown />
      </header>

      {/* Global Filter Toolbar */}
      <FilterBar />

      {/* Main Page Area */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
