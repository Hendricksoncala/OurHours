import { Link } from 'react-router-dom';
import Icon from './Icons';
import { useApp } from '../context/AppContext';
const fmt = (d) =>
  new Date(`${d}T12:00:00`).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
export default function ActivityCard({ activity }) {
  const { favorites, toggleFavorite, enrollments, enroll } = useApp();
  const liked = favorites.includes(activity.id),
    joined = enrollments.includes(activity.id);
  return (
    <article className="activity-card">
      <div className="card-art">
        <span className={`type-pill ${activity.tipo}`}>{activity.tipo}</span>
        <button
          className={`heart-btn ${liked ? 'liked' : ''}`}
          onClick={() => toggleFavorite(activity.id)}
          aria-label={liked ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <Icon name="heart" fill={liked ? 'currentColor' : 'none'} />
        </button>
        <span className="art-symbol">
          {activity.tipo === 'deportiva'
            ? '✦'
            : activity.tipo === 'académica'
              ? '▧'
              : activity.tipo === 'voluntariado'
                ? '✳'
                : '◉'}
        </span>
      </div>
      <div className="card-body">
        <div className="card-date">
          <Icon name="calendar" size={15} />
          {fmt(activity.fecha)} <span>·</span> {activity.hora}
        </div>
        <Link className="card-title" to={`/actividad/${activity.id}`}>
          {activity.nombre}
        </Link>
        <p className="card-place">
          <Icon name="pin" size={15} />
          {activity.lugar}
        </p>
        <div className="card-bottom">
          <span className="hours">
            <b>{activity.horas}</b> horas HL
          </span>
          <button
            className={`small-cta ${joined ? 'joined' : ''}`}
            onClick={() => enroll(activity.id)}
          >
            {joined ? (
              <>
                <Icon name="check" size={15} /> Inscrita
              </>
            ) : (
              'Inscribirme'
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
