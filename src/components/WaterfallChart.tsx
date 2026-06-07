'use client';

import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

// Register components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

interface WaterfallChartProps {
  labels: string[];
  floats: number[];
  bars: number[];
  colors: string[];
  ingresoNeto: number;
}

export default function WaterfallChart({ labels, floats, bars, colors, ingresoNeto }: WaterfallChartProps) {
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
            label: 'base',
            data: floats,
            backgroundColor: 'transparent',
            borderWidth: 0,
            barPercentage: 0.55
          },
          {
            label: 'valor',
            data: bars,
            backgroundColor: colors,
            borderRadius: 3,
            borderSkipped: false,
            barPercentage: 0.55
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: { ...TICK, autoSkip: false, maxRotation: 30 },
            grid: GRID
          },
          y: {
            stacked: true,
            ticks: {
              ...TICK,
              callback: (v) => `Gs. ${Math.round(Number(v)).toLocaleString('es-PY')}M`
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
            // Filter out base dataset from tooltip trigger
            filter: (ctx) => ctx.datasetIndex === 1,
            callbacks: {
              label: (ctx) => {
                const index = ctx.dataIndex;
                const v = Math.abs(bars[index]);
                const pct = ingresoNeto > 0 ? ((v * 1e6) / ingresoNeto * 100).toFixed(1) : '0';
                return ` Gs. ${Math.round(v).toLocaleString('es-PY')}M (${pct}%)`;
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
  }, [labels, floats, bars, colors, ingresoNeto]);

  return (
    <div style={{ position: 'relative', height: '300px' }}>
      <canvas ref={canvasRef} aria-label="Waterfall P&L Chart" />
    </div>
  );
}
