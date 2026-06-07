'use client';

import { useFilters } from '../../../lib/useFilters';
import { RAW, MESES_LABEL, EG_CATS, EG_MAP, fmtB } from '../../../lib/data';
import KpiCard from '../../../components/KpiCard';
import ChartMonthlyBar from '../../../components/ChartMonthlyBar';
import ChartStackedBar from '../../../components/ChartStackedBar';

interface CompiledMonth {
  mes: string;
  num: number;
  tipo: 'Realizado' | 'Proyectado';
  'Ingreso Neto': number;
  'UT Operativa': number;
  [key: string]: string | number; // Index signature for categories
}

export default function MesAMesPage() {
  const { desde, hasta, tipo } = useFilters();

  // Compile monthly values aggregated across all branches
  const monthlyData: CompiledMonth[] = [];

  for (let m = desde; m <= hasta; m++) {
    // Determine month type (using La Provista as reference since type mapping is identical for all branches)
    const refRow = RAW.pl_monthly['La Provista'].find(r => r.num === m);
    if (!refRow) continue;
    if (tipo !== 'Ambos' && refRow.tipo !== tipo) continue;

    // Aggregate values for all branches
    const monthBranchesRows = RAW.sucs
      .map(suc => RAW.pl_monthly[suc].find(r => r.num === m))
      .filter(Boolean);

    const entry: CompiledMonth = {
      mes: MESES_LABEL[m - 1],
      num: m,
      tipo: refRow.tipo,
      'Ingreso Neto': monthBranchesRows.reduce((sum, r) => sum + (r?.['Ingreso Neto'] || 0), 0),
      'UT Operativa': monthBranchesRows.reduce((sum, r) => sum + (r?.['UT Operativa'] || 0), 0)
    };

    // Aggregate expense categories
    EG_CATS.forEach(cat => {
      entry[cat] = monthBranchesRows.reduce((sum, r) => sum + (r?.[cat] || 0), 0);
    });

    // Calculate monthly margin
    const ing = entry['Ingreso Neto'];
    const ut = entry['UT Operativa'];
    entry.margen = ing > 0 ? (ut / ing) * 100 : 0;

    monthlyData.push(entry);
  }

  const hasData = monthlyData.length > 0;

  // Compute metrics
  const totalIng = monthlyData.reduce((sum, m) => sum + m['Ingreso Neto'], 0);
  const totalUT = monthlyData.reduce((sum, m) => sum + m['UT Operativa'], 0);
  const totalMargin = totalIng > 0 ? ((totalUT / totalIng) * 100).toFixed(1) : '0';

  let bestMonth = { mes: '—', margen: 0 };
  let worstMonth = { mes: '—', margen: 0 };

  if (hasData) {
    const sortedByMargin = [...monthlyData].sort((a, b) => (a.margen as number) - (b.margen as number));
    const worst = sortedByMargin[0];
    const best = sortedByMargin[sortedByMargin.length - 1];

    bestMonth = { mes: worst.mes, margen: Math.round(best.margen as number) };
    worstMonth = { mes: worst.mes, margen: Math.round(worst.margen as number) };
    
    // Explicit calculations to find true extremes
    let maxM = -Infinity;
    let minM = Infinity;
    monthlyData.forEach(m => {
      const marg = m.margen as number;
      if (marg > maxM) {
        maxM = marg;
        bestMonth = { mes: m.mes, margen: Math.round(marg) };
      }
      if (marg < minM) {
        minM = marg;
        worstMonth = { mes: m.mes, margen: Math.round(marg) };
      }
    });
  }

  // Pre-arrange chart arrays
  const labels = monthlyData.map(m => m.mes);
  const ingR = monthlyData.map(m => m.tipo === 'Realizado' ? m['Ingreso Neto'] / 1e6 : null);
  const ingP = monthlyData.map(m => m.tipo === 'Proyectado' ? m['Ingreso Neto'] / 1e6 : null);
  const utR = monthlyData.map(m => m.tipo === 'Realizado' ? m['UT Operativa'] / 1e6 : null);
  const utP = monthlyData.map(m => m.tipo === 'Proyectado' ? m['UT Operativa'] / 1e6 : null);

  const stackDatasets = EG_CATS.map(cat => ({
    label: cat,
    data: monthlyData.map(m => (m[cat] as number) / 1e6),
    backgroundColor: EG_MAP[cat]
  }));

  return (
    <div>
      {!hasData ? (
        <div className="card">
          <div className="no-data">Sin datos para el rango e intervalo seleccionado</div>
        </div>
      ) : (
        <>
          {/* KPIs */}
          <div className="grid4">
            <KpiCard
              label="Ingreso Período"
              value={`Gs. ${fmtB(totalIng)}B`}
              subText={`${monthlyData.length} meses consolidados`}
            />
            <KpiCard
              label="UT Operativa"
              value={`Gs. ${fmtB(totalUT)}B`}
              subText={`${totalMargin}% margen promedio`}
            />
            <KpiCard
              label="Mejor mes"
              value={bestMonth.mes}
              subText={`Margen ${bestMonth.margen}%`}
            />
            <KpiCard
              label="Peor mes"
              value={worstMonth.mes}
              subText={`Margen ${worstMonth.margen}%`}
            />
          </div>

          {/* Dual Bar Chart (Income vs UT Operativa) */}
          <div className="card">
            <h2 className="sec">Ingresos vs UT Operativa — meses filtrados (Gs. millones)</h2>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '14px', fontSize: '11px', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '2px', backgroundColor: 'rgba(100,116,139,0.5)' }}></span>
                Ingreso realizado
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '2px', backgroundColor: 'rgba(29,78,216,0.55)' }}></span>
                Ingreso proyectado
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '2px', backgroundColor: 'rgba(21,128,61,0.75)' }}></span>
                UT realizada
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '2px', backgroundColor: 'rgba(21,128,61,0.35)' }}></span>
                UT proyectada
              </span>
            </div>
            
            <ChartMonthlyBar
              labels={labels}
              ingR={ingR}
              ingP={ingP}
              utR={utR}
              utP={utP}
            />
          </div>

          {/* Stacked Bar Chart (Expense breakdown) */}
          <div className="card">
            <h2 className="sec">Composición de egresos mensual (Gs. millones)</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '14px', fontSize: '11px', color: 'var(--text-secondary)' }}>
              {EG_CATS.map(cat => (
                <span key={cat} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: EG_MAP[cat] }}></span>
                  {cat.replace('Costos de ', 'C.').replace('Gastos del ', 'G.').replace('Gastos de ', 'G.')}
                </span>
              ))}
            </div>
            
            <ChartStackedBar
              labels={labels}
              datasets={stackDatasets}
            />
          </div>
        </>
      )}
    </div>
  );
}
