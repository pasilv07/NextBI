'use client';

import { useFilters } from '../../../lib/useFilters';
import { getFilteredData, sumField, fmt, fmtB, EG_CATS } from '../../../lib/data';
import KpiCard from '../../../components/KpiCard';
import WaterfallChart from '../../../components/WaterfallChart';
import { useData } from '../../../lib/DataContext';

export default function WaterfallPage() {
  const { desde, hasta, tipo } = useFilters();
  const { records, sucs } = useData();

  // Aggregate global values
  const ing = sucs.reduce((sum, suc) => sum + sumField(getFilteredData(records, suc, desde, hasta, tipo), 'Ingreso Neto'), 0);
  const ut = sucs.reduce((sum, suc) => sum + sumField(getFilteredData(records, suc, desde, hasta, tipo), 'UT Operativa'), 0);
  const totalEg = ing - ut;
  const egPercentage = ing > 0 ? ((totalEg / ing) * 100).toFixed(1) : '0';
  const margin = ing > 0 ? ((ut / ing) * 100).toFixed(1) : '0';

  const hasData = ing > 0 || ut > 0;

  // Build Waterfall items
  const wfItems = [
    { label: 'Ingreso Neto', valor: ing, tipo: 'inicio' as const },
    ...EG_CATS.map(cat => ({
      label: cat.replace('Costos de ', 'C. ').replace('Gastos del ', 'G. ').replace('Gastos de ', 'G. '),
      valor: -sucs.reduce((sum, suc) => sum + sumField(getFilteredData(records, suc, desde, hasta, tipo), cat), 0),
      tipo: 'egreso' as const
    })),
    { label: 'UT Operativa', valor: ut, tipo: 'resultado' as const }
  ];

  // Process coordinates for the floating stacked bars
  const floats: number[] = [];
  const bars: number[] = [];
  const colors: string[] = [];
  let running = ing;

  wfItems.forEach(item => {
    if (item.tipo === 'inicio') {
      floats.push(0);
      bars.push(item.valor / 1e6);
      colors.push('#1d4ed8'); // blue
    } else if (item.tipo === 'resultado') {
      floats.push(0);
      bars.push(item.valor / 1e6);
      colors.push('#15803d'); // green
    } else {
      // Correct mathematical waterfall alignment
      running += item.valor; // subtract expense (item.valor is negative)
      floats.push(running / 1e6);
      bars.push(Math.abs(item.valor) / 1e6);
      colors.push('#dc2626'); // red
    }
  });

  return (
    <div>
      {!hasData ? (
        <div className="card">
          <div className="no-data">Sin datos para el filtro seleccionado</div>
        </div>
      ) : (
        <>
          {/* KPIs */}
          <div className="grid3">
            <KpiCard
              label="Ingreso Neto"
              value={`Gs. ${fmtB(ing)}B`}
              subText="base consolidada"
            />
            <KpiCard
              label="Total Egresos"
              value={`Gs. ${fmtB(totalEg)}B`}
              subText={ing > 0 ? `${egPercentage}% del ingreso` : '—'}
            />
            <KpiCard
              label="UT Operativa"
              value={`Gs. ${fmtB(ut)}B`}
              subText={ing > 0 ? `${margin}% margen` : '—'}
            />
          </div>

          {/* Chart Card */}
          <div className="card">
            <h2 className="sec">Cascada P&L — período filtrado (Gs. millones)</h2>
            <WaterfallChart
              labels={wfItems.map(item => item.label)}
              floats={floats}
              bars={bars}
              colors={colors}
              ingresoNeto={ing}
            />
          </div>

          {/* Detailed Ledger Table */}
          <div className="card">
            <h2 className="sec">Detalle por rubro</h2>
            <div className="tbl-container">
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Rubro</th>
                    <th>Gs. Millones</th>
                    <th>% Ingreso</th>
                    <th>Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {wfItems.map((item, idx) => {
                    const absVal = Math.abs(item.valor) / 1e6;
                    const pct = ing > 0 ? ((Math.abs(item.valor) / ing) * 100).toFixed(1) : '0';
                    
                    let chipClass = 'c-blue';
                    let typeText = 'Ingreso';
                    let rowStyle: React.CSSProperties = { fontWeight: 600 };

                    if (item.tipo === 'egreso') {
                      chipClass = 'c-bad';
                      typeText = 'Egreso';
                      rowStyle = { fontWeight: 400 };
                    } else if (item.tipo === 'resultado') {
                      chipClass = 'c-ok';
                      typeText = 'Resultado';
                    }

                    return (
                      <tr key={idx} style={rowStyle}>
                        <td>{item.label}</td>
                        <td className={item.tipo === 'egreso' ? 'neg' : item.tipo === 'resultado' ? 'pos' : ''}>
                          {item.tipo === 'egreso' ? `(${fmt(Math.abs(item.valor))})` : fmt(item.valor)}
                        </td>
                        <td style={{ color: 'var(--text-muted)' }}>{pct}%</td>
                        <td>
                          <span className={`chip ${chipClass}`}>{typeText}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
