'use client';

import { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { fmt } from '../lib/data';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

interface ChartDonutProps {
  data: number[];
  labels: string[];
  colors: string[];
}

export default function ChartDonut({ data, labels, colors }: ChartDonutProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<'doughnut'> | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart to avoid overlay issues
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const shortLabels = labels.map(c => 
      c.replace('Costos de ', 'C. ')
       .replace('Gastos del ', 'G. ')
       .replace('Gastos de ', 'G. ')
    );

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: shortLabels,
        datasets: [{
          data: data,
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
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
                return ` ${ctx.label}: Gs. ${fmt(val)}M`;
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
  }, [data, labels, colors]);

  return (
    <div style={{ position: 'relative', height: '240px' }}>
      <canvas ref={canvasRef} aria-label="Estructura de costos doughnut chart" />
    </div>
  );
}
