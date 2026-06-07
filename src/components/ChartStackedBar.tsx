'use client';

import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

// Register components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface ChartStackedBarProps {
  labels: string[];
  datasets: Dataset[];
}

export default function ChartStackedBar({ labels, datasets }: ChartStackedBarProps) {
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
        datasets: datasets.map(ds => ({
          ...ds,
          borderWidth: 0,
          borderSkipped: false
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            ticks: { ...TICK, autoSkip: false },
            grid: GRID
          },
          y: {
            stacked: true,
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
  }, [labels, datasets]);

  return (
    <div style={{ position: 'relative', height: '190px' }}>
      <canvas ref={canvasRef} aria-label="Composición de egresos mensual" />
    </div>
  );
}
