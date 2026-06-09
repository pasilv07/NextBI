'use client';

import { useFilters } from '../../../lib/useFilters';
import { getFilteredData, sumField, fmt, fmtB, SUC_COLORS } from '../../../lib/data';
import { useData } from '../../../lib/DataContext';

interface BranchRanking {
  suc: string;
  ing: number;
  ut: number;
  margen: number;
}

export default function RankingPage() {
  const { desde, hasta, tipo } = useFilters();
  const { records, sucs } = useData();

  // Compute stats for each branch
  const ranking: BranchRanking[] = sucs.map(suc => {
    const rows = getFilteredData(records, suc, desde, hasta, tipo);
    const ing = sumField(rows, 'Ingreso Neto');
    const ut = sumField(rows, 'UT Operativa');
    const margen = ing > 0 ? (ut / ing) * 100 : 0;
    return {
      suc,
      ing,
      ut,
      margen: parseFloat(margen.toFixed(1))
    };
  }).sort((a, b) => b.margen - a.margen);

  const maxM = Math.max(...ranking.map(r => r.margen));
  const totalGroupIng = ranking.reduce((sum, r) => sum + r.ing, 0);

  // Heatmap background color logic based on margin value
  function getHeatmapBg(v: number) {
    if (v === 0) return '#eeecea';
    if (v < 0) return `rgba(185,28,28, ${Math.min(1, Math.abs(v) / 40)})`; // red
    if (v < 10) return `rgba(180,83,9, ${Math.min(1, v / 30)})`; // orange
    if (v < 20) return `rgba(2,132,199, ${Math.min(1, v / 30)})`; // blue
    return `rgba(21,128,61, ${Math.min(1, v / 40)})`; // green
  }

  // Heatmap text color logic
  function getHeatmapText(v: number) {
    if (v === 0) return '#a8a7a3';
    if (Math.abs(v) > 15) return '#ffffff';
    return '#1a1a18';
  }

  const shortMonths = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  const alerts = [
    { type: 'al-r', text: 'Pez de Mar Dulce — 1.3% margen anual. Feb–Abr con pérdidas operativas consecutivas.' },
    { type: 'al-r', text: 'Pinton — acumulado realizado negativo (–Gs. 25M). Recuperación proyectada no garantizada.' },
    { type: 'al-r', text: 'Pétalo de Estrellas — 6 meses con ingresos en cero. Verificar datos o cierre estacional.' },
    { type: 'al-y', text: 'Caída sistémica Feb–Mar en todas las sucursales. Probable efecto estacional post-verano.' },
    { type: 'al-g', text: 'Patria sostiene el 52% de la UT del grupo con 30.2% de margen. Mejor performer.' }
  ];

  return (
    <div>
      {/* Upper Grid: Ranking Bars and Heatmap */}
      <div className="grid2">
        {/* Ranking card */}
        <div className="card">
          <h2 className="sec">Ranking — período filtrado</h2>
          <div>
            {ranking.map(r => {
              const chipClass = r.margen >= 20 ? 'c-ok' : r.margen >= 10 ? 'c-warn' : 'c-bad';
              const widthPct = maxM > 0 ? (r.margen / maxM) * 100 : 0;
              return (
                <div key={r.suc} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 500 }}>{r.suc}</span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        Gs. {fmtB(r.ing)}B
                      </span>
                      <span className={`chip ${chipClass}`}>{r.margen}%</span>
                    </div>
                  </div>
                  <div className="bar-wrap" style={{ height: '6px' }}>
                    <div
                      className="bar-fill"
                      style={{
                        width: `${widthPct.toFixed(0)}%`,
                        backgroundColor: SUC_COLORS[r.suc] || 'var(--text)'
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Heatmap Card */}
        <div className="card">
          <h2 className="sec">Mapa de calor — margen mensual</h2>
          <div className="tbl-container">
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '4px 6px', color: 'var(--text-muted)', fontSize: '10px', fontWeight: 500, minWidth: '70px' }}>
                    Sucursal
                  </th>
                  {shortMonths.map((m, i) => {
                    const activeMonth = i + 1 >= desde && i + 1 <= hasta;
                    return (
                      <th
                        key={i}
                        style={{
                          padding: '2px',
                          color: activeMonth ? 'var(--text)' : 'var(--text-muted)',
                          fontSize: '10px',
                          fontWeight: activeMonth ? '600' : '400',
                          textAlign: 'center',
                          minWidth: '26px'
                        }}
                      >
                        {m}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {sucs.map(s => {
                  return (
                    <tr key={s}>
                      <td style={{ padding: '4px 6px', fontSize: '10px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                        {s.split(' ')[0]} {/* First word of name */}
                      </td>
                      {Array.from({ length: 12 }).map((_, mIdx) => {
                        const mNum = mIdx + 1;
                        const row = records.find(r => r.sucursal === s && r.num === mNum);
                        const ing = row?.['Ingreso Neto'] || 0;
                        const ut = row?.['UT Operativa'] || 0;
                        const marginVal = ing > 0 ? Math.round((ut / ing) * 100) : 0;
                        
                        const inFilter = mNum >= desde && mNum <= hasta && (tipo === 'Ambos' || row?.tipo === tipo);

                        const bg = inFilter ? getHeatmapBg(marginVal) : 'var(--bg)';
                        const fg = inFilter ? getHeatmapText(marginVal) : 'var(--border-hover)';
                        const cellVal = ing === 0 ? '—' : `${marginVal}%`;

                        return (
                          <td key={mNum} style={{ padding: '1px', textAlign: 'center' }}>
                            <div
                              className="hm-cell"
                              style={{
                                background: bg,
                                color: fg,
                                opacity: inFilter ? 1 : 0.5
                              }}
                            >
                              {cellVal}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px', fontSize: '10px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '1px', backgroundColor: 'rgba(21,128,61,0.7)' }}></span>
              Verde (Alto)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '1px', backgroundColor: 'rgba(2,132,199,0.7)' }}></span>
              Azul (Medio)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '1px', backgroundColor: 'rgba(180,83,9,0.7)' }}></span>
              Naranja (Bajo)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '1px', backgroundColor: 'rgba(185,28,28,0.7)' }}></span>
              Rojo (Pérdida)
            </span>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="card">
        <h2 className="sec">Alertas</h2>
        <div>
          {alerts.map((al, idx) => (
            <div key={idx} className={`alert ${al.type}`}>
              <span>●</span>
              <span>{al.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comparative Table */}
      <div className="card">
        <h2 className="sec">Tabla comparativa</h2>
        <div className="tbl-container">
          <table className="tbl">
            <thead>
              <tr>
                <th>Sucursal</th>
                <th>Ingreso (B)</th>
                <th>UT Op. (M)</th>
                <th>Margen</th>
                <th>% grupo</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map(r => {
                const chipClass = r.margen >= 20 ? 'c-ok' : r.margen >= 10 ? 'c-warn' : 'c-bad';
                const share = totalGroupIng > 0 ? ((r.ing / totalGroupIng) * 100).toFixed(1) : '0';
                return (
                  <tr key={r.suc}>
                    <td style={{ fontWeight: 500 }}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          backgroundColor: SUC_COLORS[r.suc] || 'var(--text)',
                          marginRight: '8px'
                        }}
                      ></span>
                      {r.suc}
                    </td>
                    <td>{fmtB(r.ing)}</td>
                    <td className={r.ut >= 0 ? 'pos' : 'neg'}>
                      {r.ut < 0 ? '-' : ''}{fmt(Math.abs(r.ut))}
                    </td>
                    <td>
                      <span className={`chip ${chipClass}`}>{r.margen}%</span>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{share}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
