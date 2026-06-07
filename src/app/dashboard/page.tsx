'use client';

import { useFilters } from '../../lib/useFilters';
import { RAW, getFilteredData, sumField, fmt, fmtB, EG_CATS, EG_COLORS } from '../../lib/data';
import KpiCard from '../../components/KpiCard';
import ChartDonut from '../../components/ChartDonut';

export default function PLBranchPage() {
  const { desde, hasta, tipo, sucursal, setFilter } = useFilters();

  const rows = getFilteredData(sucursal, desde, hasta, tipo);
  const totalMonths = rows.length;

  // Calculate totals
  const ing = sumField(rows, 'Ingreso Neto');
  const ut = sumField(rows, 'UT Operativa');
  const totalEg = EG_CATS.reduce((sum, cat) => sum + sumField(rows, cat), 0);
  const margen = ing > 0 ? ((ut / ing) * 100).toFixed(1) : '0';
  const egPercentage = ing > 0 ? ((totalEg / ing) * 100).toFixed(1) : '0';
  const postIreEstimate = ut > 0 ? ut * 0.9 : 0; // -10% tax

  // Expenses values for donut
  const egVals = EG_CATS.map(cat => sumField(rows, cat));
  const totalEgSum = egVals.reduce((a, b) => a + b, 0);

  const hasData = rows.length > 0;

  return (
    <div>
      {/* Branch selector buttons */}
      <div className="suc-sel">
        {RAW.sucs.map(s => (
          <button
            key={s}
            className={`suc-btn ${s === sucursal ? 'active' : ''}`}
            onClick={() => setFilter('sucursal', s)}
          >
            {s}
          </button>
        ))}
      </div>

      {!hasData ? (
        <div className="card">
          <div className="no-data">Sin datos para el filtro seleccionado</div>
        </div>
      ) : (
        <>
          {/* KPIs Section */}
          <div className="grid4">
            <KpiCard
              label="Ingreso Neto"
              value={`Gs. ${fmtB(ing)}B`}
              subText={`${totalMonths} meses`}
            />
            <KpiCard
              label="UT Operativa"
              value={`Gs. ${fmtB(ut)}B`}
              subText={`${margen}% margen`}
            />
            <KpiCard
              label="Total Egresos"
              value={`Gs. ${fmtB(totalEg)}B`}
              subText={ing > 0 ? `${egPercentage}% s/ingreso` : '—'}
            />
            <KpiCard
              label="UT post IRE"
              value={ut > 0 ? `Gs. ${fmtB(postIreEstimate)}B` : 'Gs. 0.00B'}
              subText="estimado -10% IRE"
            />
          </div>

          {/* Breakdown Section */}
          <div className="grid2">
            {/* Detailed P&L Table */}
            <div className="card">
              <h2 className="sec">P&L detallado — período filtrado</h2>
              <div className="tbl-container">
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Cuenta</th>
                      <th>Gs. Millones</th>
                      <th>% Ingreso</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ fontWeight: 600 }}>
                      <td>Ingreso Neto</td>
                      <td>{fmt(ing)}</td>
                      <td>100%</td>
                    </tr>
                    {EG_CATS.map((cat) => {
                      const v = sumField(rows, cat);
                      const pct = ing > 0 ? ((v / ing) * 100).toFixed(1) : '—';
                      return (
                        <tr key={cat}>
                          <td style={{ color: 'var(--text-secondary)', paddingLeft: '16px' }}>— {cat}</td>
                          <td className="neg">({fmt(v)})</td>
                          <td style={{ color: 'var(--text-muted)' }}>{pct === '—' ? '—' : `${pct}%`}</td>
                        </tr>
                      );
                    })}
                    <tr style={{ borderTop: '2px solid var(--border)', fontWeight: 600 }}>
                      <td>UT Operativa</td>
                      <td className={ut >= 0 ? 'pos' : 'neg'}>{ut < 0 ? '-' : ''}{fmt(Math.abs(ut))}</td>
                      <td className={ut >= 0 ? 'pos' : 'neg'}>{margen}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cost Structure Donut Chart */}
            <div className="card">
              <h2 className="sec">Estructura de costos</h2>
              
              <ChartDonut
                data={egVals}
                labels={[...EG_CATS]}
                colors={EG_COLORS}
              />

              <div style={{ marginTop: '20px' }}>
                {EG_CATS.map((cat, idx) => {
                  const pct = totalEgSum > 0 ? ((egVals[idx] / totalEgSum) * 100).toFixed(1) : '0';
                  const cleanLabel = cat
                    .replace('Costos de ', 'C. ')
                    .replace('Gastos del ', 'G. ')
                    .replace('Gastos de ', 'G. ');
                  return (
                    <div key={cat} style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: EG_COLORS[idx] }}></div>
                          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{cleanLabel}</span>
                        </div>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{pct}%</span>
                      </div>
                      <div className="bar-wrap">
                        <div className="bar-fill" style={{ width: `${pct}%`, backgroundColor: EG_COLORS[idx] }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
