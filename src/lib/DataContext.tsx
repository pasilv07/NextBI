'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from './supabase/client';
import { MonthRecord } from './data';

export interface ExtendedMonthRecord extends MonthRecord {
  sucursal: string;
}

interface DataContextType {
  records: ExtendedMonthRecord[];
  sucs: string[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<ExtendedMonthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      
      const { data, error: dbError } = await supabase
        .from('monthly_records')
        .select('*')
        .order('num', { ascending: true });

      if (dbError) throw dbError;

      const mapped: ExtendedMonthRecord[] = (data || []).map((dbRow: any) => ({
        sucursal: dbRow.sucursal,
        mes: dbRow.mes,
        num: dbRow.num,
        tipo: dbRow.tipo as 'Realizado' | 'Proyectado',
        'Ingreso Neto': Number(dbRow.ingreso_neto || 0),
        'Costos de Producción': Number(dbRow.costos_produccion || 0),
        'Gastos del Personal': Number(dbRow.gastos_personal || 0),
        'Gastos de Ventas': Number(dbRow.gastos_ventas || 0),
        'Gastos de Ocupación': Number(dbRow.gastos_ocupacion || 0),
        'Otros Gastos': Number(dbRow.otros_gastos || 0),
        'Impuestos y Tasas': Number(dbRow.impuestos_tasas || 0),
        'Gastos Financieros': Number(dbRow.gastos_financieros || 0),
        'UT Operativa': Number(dbRow.ut_operativa || 0)
      }));

      setRecords(mapped);
    } catch (err: any) {
      console.error('Error fetching Supabase data:', err);
      setError(err.message || 'Error al conectar con la base de datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sucs = Array.from(new Set(records.map(r => r.sucursal)));

  return (
    <DataContext.Provider value={{ records, sucs, loading, error, refresh: fetchData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData debe utilizarse dentro de un DataProvider');
  }
  return context;
}
