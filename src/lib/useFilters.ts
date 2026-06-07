'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export function useFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse state from URL or use defaults
  const desde = parseInt(searchParams.get('desde') || '1', 10);
  const hasta = parseInt(searchParams.get('hasta') || '12', 10);
  const tipo = (searchParams.get('tipo') || 'Ambos') as 'Ambos' | 'Realizado' | 'Proyectado';
  const sucursal = searchParams.get('sucursal') || 'Patria';

  const setFilter = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, String(value));
    
    // Validate range consistency
    if (key === 'desde') {
      const newDesde = Number(value);
      const currentHasta = Number(params.get('hasta') || '12');
      if (currentHasta < newDesde) {
        params.set('hasta', String(newDesde));
      }
    }
    if (key === 'hasta') {
      const newHasta = Number(value);
      const currentDesde = Number(params.get('desde') || '1');
      if (newHasta < currentDesde) {
        params.set('desde', String(newHasta));
      }
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const setMultipleFilters = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      params.set(k, String(v));
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    const params = new URLSearchParams();
    params.set('desde', '1');
    params.set('hasta', '12');
    params.set('tipo', 'Ambos');
    params.set('sucursal', sucursal); // keep active branch
    router.push(`${pathname}?${params.toString()}`);
  };

  const setQuarter = (q: number) => {
    setMultipleFilters({
      desde: (q - 1) * 3 + 1,
      hasta: q * 3,
      tipo: 'Ambos'
    });
  };

  return {
    desde,
    hasta,
    tipo,
    sucursal,
    setFilter,
    setMultipleFilters,
    resetFilters,
    setQuarter,
  };
}
