export default function ProgressBar({ value, total }) {
  const pct = Math.min(100, Math.round((value / total) * 100));
  return (
    <div className="progress-wrap">
      <div className="progress-meta">
        <span>{value} horas completadas</span>
        <strong>{Math.max(total - value, 0)} h faltantes</strong>
      </div>
      <div className="progress-track">
        <span style={{ width: `${pct}%` }} />
      </div>
      <small>
        {pct}% de tu meta de {total} horas
      </small>
    </div>
  );
}
