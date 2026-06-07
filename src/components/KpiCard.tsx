'use client';

interface KpiCardProps {
  label: string;
  value: string;
  subText: string;
}

export default function KpiCard({ label, value, subText }: KpiCardProps) {
  return (
    <div className="card-sm">
      <div className="kpi-label">{label}</div>
      <div className="kpi-val" style={{ fontSize: '18px' }}>{value}</div>
      <div className="kpi-sub">{subText}</div>
    </div>
  );
}
