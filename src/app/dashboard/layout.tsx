import { Suspense } from 'react';
import DashboardLayoutContent from '../../components/DashboardLayoutContent';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
        color: 'var(--text-secondary)',
        backgroundColor: 'var(--bg)'
      }}>
        Cargando Dashboard de Control...
      </div>
    }>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Suspense>
  );
}
