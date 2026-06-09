import { Suspense } from 'react';
import DashboardLayoutContent from '../../components/DashboardLayoutContent';
import { DataProvider } from '../../lib/DataContext';

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
      <DataProvider>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </DataProvider>
    </Suspense>
  );
}
