import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Walter S.A. — Dashboard de Control Presupuestario',
  description: 'Sistema consolidado de control financiero, P&L detallado, evolutivos mensuales, ranking de sucursales y waterfall de egresos para Walter S.A.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
