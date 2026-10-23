import Icon from './Icons';
export default function MapPin({ activity, selected, onClick }) {
  return (
    <button
      className={`map-pin ${selected ? 'active' : ''}`}
      style={{ left: `${activity.x}%`, top: `${activity.y}%` }}
      onClick={onClick}
      aria-label={activity.nombre}
    >
      <span className="pin-dot">
        <Icon name="pin" size={15} />
      </span>
      <span className="pin-label">{activity.nombre}</span>
    </button>
  );
}
