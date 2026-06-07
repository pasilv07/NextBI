'use client';

import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

// Register components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

interface ChartMonthlyBarProps {
  labels: string[];
  ingR: (number | null)[];
  ingP: (number | null)[];
  utR: (number | null)[];
  utP: (number | null)[];
}

export default function ChartMonthlyBar({ labels, ingR, ingP, utR, utP }: ChartMonthlyBarProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<'bar'> | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const TICK = { color: '#a8a7a3', font: { family: "'IBM Plex Sans'", size: 10 } };
    const GRID = { color: 'rgba(0,0,0,0.04)', drawBorder: false };

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Ingreso Real.',
            data: ingR,
            backgroundColor: 'rgba(100,116,139,0.5)',
            borderRadius: 3,
            borderSkipped: false
          },
          {
            label: 'Ingreso Proy.',
            data: ingP,
            backgroundColor: 'rgba(29,78,216,0.55)',
            borderRadius: 3,
            borderSkipped: false
          },
          {
            label: 'UT Real.',
            data: utR,
            backgroundColor: 'rgba(21,128,61,0.75)',
            borderRadius: 3,
            borderSkipped: false
          },
          {
            label: 'UT Proy.',
            data: utP,
            backgroundColor: 'rgba(21,128,61,0.35)',
            borderRadius: 3,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: { ...TICK, autoSkip: false },
            grid: GRID
          },
          y: {
            ticks: {
              ...TICK,
              callback: (v) => `Gs. ${Math.round(Number(v))}M`
            },
            grid: GRID
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#1a1a18',
            borderColor: '#dddcd8',
            borderWidth: 1,
            titleColor: '#ffffff',
            bodyColor: '#a8a7a3',
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: (ctx) => {
                const val = ctx.raw as number;
                return ` ${ctx.dataset.label}: Gs. ${Math.round(val || 0).toLocaleString('es-PY')}M`;
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [labels, ingR, ingP, utR, utP]);

  return (
    <div style={{ position: 'relative', height: '210px' }}>
      <canvas ref={canvasRef} aria-label="Ingresos vs UT Operativa" />
    </div>
  );
}
