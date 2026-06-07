'use client';

import { useFilters } from '../lib/useFilters';
import { MESES_LABEL } from '../lib/data';
import { RotateCcw } from 'lucide-react';

export default function FilterBar() {
  const { desde, hasta, tipo, setFilter, resetFilters, setQuarter } = useFilters();

  const handleDesdeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter('desde', parseInt(e.target.value, 10));
  };

  const handleHastaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter('hasta', parseInt(e.target.value, 10));
  };

  const activeQuarter = () => {
    if (tipo !== 'Ambos') return null;
    if (desde === 1 && hasta === 3) return 1;
    if (desde === 4 && hasta === 6) return 2;
    if (desde === 7 && hasta === 9) return 3;
    if (desde === 10 && hasta === 12) return 4;
    return null;
  };

  const qActive = activeQuarter();
  const nMonths = hasta - desde + 1;
  const labelDesde = MESES_LABEL[desde - 1];
  const labelHasta = MESES_LABEL[hasta - 1];

  return (
    <div className="filter-bar">
      {/* Período */}
      <div className="filter-group">
        <span className="filter-label">Período</span>
        <div className="filter-range">
          <select value={desde} onChange={handleDesdeChange}>
            {MESES_LABEL.map((m, idx) => (
              <option key={m} value={idx + 1}>{m}</option>
            ))}
          </select>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <select value={hasta} onChange={handleHastaChange}>
            {MESES_LABEL.map((m, idx) => (
              <option key={m} value={idx + 1}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tipo de Datos */}
      <div className="filter-group">
        <span className="filter-label">Tipo</span>
        <div className="filter-pills">
          <button
            className={`pill pill-tipo ambos ${tipo === 'Ambos' ? 'active' : ''}`}
            onClick={() => setFilter('tipo', 'Ambos')}
          >
            Ambos
          </button>
          <button
            className={`pill pill-tipo real ${tipo === 'Realizado' ? 'active' : ''}`}
            onClick={() => setFilter('tipo', 'Realizado')}
          >
            Realizado
          </button>
          <button
            className={`pill pill-tipo proy ${tipo === 'Proyectado' ? 'active' : ''}`}
            onClick={() => setFilter('tipo', 'Proyectado')}
          >
            Proyectado
          </button>
        </div>
      </div>

      {/* Trimestre */}
      <div className="filter-group">
        <span className="filter-label">Trim.</span>
        <div className="filter-pills">
          {[1, 2, 3, 4].map(q => (
            <button
              key={q}
              className={`pill ${qActive === q ? 'active' : ''}`}
              onClick={() => setQuarter(q)}
            >
              Q{q}
            </button>
          ))}
        </div>
      </div>

      {/* Badge Resumen */}
      <span className="filter-badge">
        {labelDesde}–{labelHasta} ({nMonths} mes{nMonths > 1 ? 'es' : ''}) · {tipo}
      </span>

      {/* Limpiar */}
      <button className="filter-reset" onClick={resetFilters}>
        <RotateCcw size={11} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
        Limpiar
      </button>
    </div>
  );
}
