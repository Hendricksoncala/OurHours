import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { activities } from '../data/activities';
import { REQUIRED_HOURS } from '../data/constants';
import { useApp } from '../context/AppContext';
import ActivityCard from '../components/ActivityCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ProgressBar from '../components/ProgressBar';
import MapPin from '../components/MapPin';
import Accordion from '../components/Accordion';
import Icon from '../components/Icons';
const today = new Date().toISOString().slice(0, 10),
  dateLabel = (d) =>
    new Date(`${d}T12:00:00`).toLocaleDateString('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
function Heading({ eyebrow, title, subtitle }) {
  return (
    <div className="page-heading">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
export function Inicio() {
  const todayItems = activities.filter((a) => a.fecha === today);
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">TU TIEMPO, TU IMPACTO</span>
          <h1>
            Las horas libres
            <br />
            también cuentan.
          </h1>
          <p>Encuentra actividades que te gustan, suma horas HL y vive más tu campus.</p>
          <div className="hero-actions">
            <Link className="button primary" to="/actividades">
              Explorar actividades <Icon name="arrow" size={18} />
            </Link>
            <Link className="button ghost" to="/mapa">
              Ver mapa del campus
            </Link>
          </div>
          <div className="hero-note">
            <span className="note-dot" /> Actividades abiertas para toda la comunidad UNAB
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-circle">
            <span className="circle-sun" />
            <div className="campus-building">
              <i />
              <i />
              <i />
              <i />
              <b />
            </div>
            <div className="campus-ground" />
            <span className="campus-caption">TU CAMPUS, A TU RITMO</span>
          </div>
          <span className="float-tag">
            <b>+2 h</b>
            <small>por actividad</small>
          </span>
        </div>
      </section>
      <div className="stats-strip">
        <div>
          <b>100 h</b>
          <span>meta de horas HL</span>
        </div>
        <i />
        <div>
          <b>12+</b>
          <span>actividades para elegir</span>
        </div>
        <i />
        <div>
          <b>4 tipos</b>
          <span>de experiencias</span>
        </div>
      </div>
      <section className="section">
        <div className="section-top">
          <div>
            <span className="eyebrow">PARA HOY</span>
            <h2>Actividades de hoy</h2>
            <p>Haz que cada hora cuente en tu campus.</p>
          </div>
          <Link className="text-link" to="/actividades">
            Ver todas <Icon name="arrow" size={16} />
          </Link>
        </div>
        {todayItems.length ? (
          <div className="activity-grid">
            {todayItems.map((a) => (
              <ActivityCard key={a.id} activity={a} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>☀</span>
            <h3>Hoy es buen día para planear</h3>
            <p>No hay actividades programadas para hoy. Explora las próximas experiencias.</p>
            <Link className="button primary" to="/calendario">
              Ver calendario
            </Link>
          </div>
        )}
      </section>
      <section className="feature-band">
        <div className="feature-icon">
          <Icon name="map" size={26} />
        </div>
        <div>
          <h2>Tu próxima experiencia está cerca</h2>
          <p>Explora los espacios del campus y encuentra actividades a unos pasos de ti.</p>
        </div>
        <Link className="button dark" to="/mapa">
          Explorar mapa <Icon name="arrow" size={18} />
        </Link>
      </section>
    </>
  );
}
export function Actividades() {
  const [q, setQ] = useState(''),
    [filters, setFilters] = useState({ tipo: '', fecha: '', horas: '' });
  const filtered = useMemo(
    () =>
      activities.filter(
        (a) =>
          (!q || `${a.nombre} ${a.lugar}`.toLowerCase().includes(q.toLowerCase())) &&
          (!filters.tipo || a.tipo === filters.tipo) &&
          (!filters.fecha ||
            (filters.fecha === 'today'
              ? a.fecha === today
              : new Date(`${a.fecha}T12:00:00`) - new Date() <= 7 * 864e5 && a.fecha >= today)) &&
          (!filters.horas || (filters.horas === '2' ? a.horas === 2 : a.horas >= 3)),
      ),
    [q, filters],
  );
  return (
    <section className="section page-section">
      <Heading
        eyebrow="ENCUENTRA TU PLAN"
        title="Actividades"
        subtitle="Experiencias para aprender, compartir y sumar horas HL."
      />
      <div className="activity-tools">
        <SearchBar value={q} onChange={setQ} />
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>
      <p className="results-count">{filtered.length} actividades encontradas</p>
      {filtered.length ? (
        <div className="activity-grid">
          {filtered.map((a) => (
            <ActivityCard key={a.id} activity={a} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No encontramos actividades</h3>
          <p>Prueba otros términos o cambia los filtros.</p>
        </div>
      )}
    </section>
  );
}
export function Mapa() {
  const [selected, setSelected] = useState(null),
    [q, setQ] = useState('');
  const visible = activities.filter(
    (a) => !q || `${a.nombre} ${a.lugar}`.toLowerCase().includes(q.toLowerCase()),
  );
  const activity = activities.find((a) => a.id === selected);
  return (
    <section className="section page-section">
      <Heading
        eyebrow="ENCUENTRA TU LUGAR"
        title="Mapa del campus"
        subtitle="Explora actividades y descubre dónde suceden."
      />
      <SearchBar value={q} onChange={setQ} placeholder="Buscar actividad o lugar..." />
      <div className="map-layout">
        <div className="campus-map">
          <div className="map-watermark">UNAB</div>
          <div className="map-road road-a" />
          <div className="map-road road-b" />
          <div className="map-road road-c" />
          <div className="map-green green-a" />
          <div className="map-green green-b" />
          <div className="map-building building-a">BIBLIOTECA</div>
          <div className="map-building building-b">EDIFICIO L</div>
          <div className="map-building building-c">COLISEO</div>
          <div className="map-building building-d">AUDITORIO</div>
          <div className="map-building building-e">PLAZOLETA</div>
          {visible.map((a) => (
            <MapPin
              key={a.id}
              activity={a}
              selected={selected === a.id}
              onClick={() => setSelected(a.id)}
            />
          ))}
          <span className="map-north">N ↑</span>
          <div className="map-legend">
            <span /> Actividad disponible
          </div>
        </div>
        <aside className="map-info">
          <span className="eyebrow">CAMPUS EL JARDÍN</span>
          <h2>{activity ? activity.nombre : 'Explora el campus'}</h2>
          <p>
            {activity
              ? activity.description
              : 'Selecciona un pin para conocer más sobre las actividades disponibles.'}
          </p>
          {activity && (
            <>
              <div className="info-detail">
                <Icon name="pin" />
                {activity.lugar}
              </div>
              <div className="info-detail">
                <Icon name="calendar" />
                {dateLabel(activity.fecha)} · {activity.hora}
              </div>
              <div className="map-hours">
                {activity.horas} <small>horas HL</small>
              </div>
              <div className="hero-actions">
                <Link className="button primary" to={`/actividad/${activity.id}`}>
                  Ver actividad
                </Link>
                <EnrollButton id={activity.id} />
              </div>
            </>
          )}
        </aside>
      </div>
      <div className="mobile-map-activities">
        <h2>Actividades en el mapa</h2>
        {visible.slice(0, 4).map((a) => (
          <button key={a.id} onClick={() => setSelected(a.id)}>
            <span className="note-dot" />
            {a.nombre}
            <b>{a.horas} h</b>
          </button>
        ))}
      </div>
    </section>
  );
}
function EnrollButton({ id }) {
  const { enrollments, enroll } = useApp(),
    [msg, setMsg] = useState('');
  const joined = enrollments.includes(id);
  return (
    <div>
      <button
        className={`button ${joined ? 'secondary' : 'dark'}`}
        onClick={() => {
          if (!joined) {
            enroll(id);
            setMsg('¡Listo! Tu inscripción quedó guardada.');
          }
        }}
      >
        {joined ? 'Inscrita' : 'Inscribirme'}
      </button>
      {msg && <small className="success-message">{msg}</small>}
    </div>
  );
}
export function Detalle() {
  const { id } = useParams(),
    a = activities.find((x) => x.id === Number(id));
  return a ? (
    <section className="section page-section">
      <Link to="/actividades" className="back-link">
        ← Volver a actividades
      </Link>
      <div className="detail-layout">
        <div>
          <div className="detail-art">
            <span className={`type-pill ${a.tipo}`}>{a.tipo}</span>
            <span className="art-symbol">◉</span>
          </div>
          <span className="eyebrow">UNA EXPERIENCIA PARA TI</span>
          <h1>{a.nombre}</h1>
          <p className="lead">{a.description}</p>
          <h2>Sobre la actividad</h2>
          <p>
            Participa, conoce a otras personas y aprovecha tu tiempo en la universidad. Esta
            actividad reconoce tu participación con horas libres (HL).
          </p>
          <div className="detail-facts">
            <div>
              <Icon name="calendar" />
              <span>
                <small>Fecha</small>
                {dateLabel(a.fecha)}
              </span>
            </div>
            <div>
              <Icon name="clock" />
              <span>
                <small>Hora</small>
                {a.hora}
              </span>
            </div>
            <div>
              <Icon name="pin" />
              <span>
                <small>Lugar</small>
                {a.lugar}
              </span>
            </div>
          </div>
        </div>
        <aside className="detail-aside">
          <span className="eyebrow">RECONOCIMIENTO</span>
          <strong className="detail-hours">
            {a.horas}
            <small> horas HL</small>
          </strong>
          <p>Se suman a tu progreso al completar la actividad.</p>
          <EnrollButton id={a.id} />
          <Link className="text-link" to="/mapa">
            Ver en el mapa <Icon name="arrow" size={16} />
          </Link>
        </aside>
      </div>
    </section>
  ) : (
    <div className="empty-state">
      <h2>Actividad no encontrada</h2>
      <Link to="/actividades">Volver a actividades</Link>
    </div>
  );
}
export function Calendario() {
  const upcoming = activities
    .filter((a) => a.fecha >= today)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
  const groups = Object.groupBy
    ? Object.groupBy(upcoming, (a) => a.fecha)
    : upcoming.reduce((g, a) => ({ ...g, [a.fecha]: [...(g[a.fecha] || []), a] }), {});
  return (
    <section className="section page-section">
      <Heading
        eyebrow="ORGANIZA TU SEMANA"
        title="Próximas actividades"
        subtitle="Encuentra tu próximo plan y reserva un espacio en tu agenda."
      />
      <div className="calendar-list">
        {Object.entries(groups).map(([date, items]) => (
          <section className="day-group" key={date}>
            <div className="day-label">
              <span>
                {new Date(`${date}T12:00:00`)
                  .toLocaleDateString('es-CO', { weekday: 'short' })
                  .replace('.', '')}
              </span>
              <b>{new Date(`${date}T12:00:00`).getDate()}</b>
              <small>
                {new Date(`${date}T12:00:00`).toLocaleDateString('es-CO', { month: 'short' })}
              </small>
            </div>
            <div className="day-items">
              <h2>{dateLabel(date)}</h2>
              {items.map((a) => (
                <Link className="calendar-event" to={`/actividad/${a.id}`} key={a.id}>
                  <span className="event-time">{a.hora}</span>
                  <span className={`event-dot ${a.tipo}`} />
                  <span className="event-main">
                    <b>{a.nombre}</b>
                    <small>
                      <Icon name="pin" size={14} />
                      {a.lugar}
                    </small>
                  </span>
                  <span className="event-hours">{a.horas} h</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
export function Protected({ children }) {
  const { user } = useApp();
  return user ? children : <Login />;
}
export function Perfil() {
  const { user, enrollments, completed, logout } = useApp();
  const mine = activities.filter((a) => completed.includes(a.id)),
    enrolled = activities.filter((a) => enrollments.includes(a.id));
  const hours = mine.reduce((sum, a) => sum + a.horas, 0);
  return (
    <section className="section page-section">
      <Heading
        eyebrow="TU CAMINO UNAB"
        title="Mi perfil"
        subtitle="Lleva el control de tus horas y actividades."
      />
      <div className="profile-grid">
        <div className="profile-card">
          <div className="avatar">{user.name?.[0]?.toUpperCase() || 'E'}</div>
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          <button className="text-link" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
        <div className="goal-card">
          <span className="eyebrow">META DE HORAS LIBRES</span>
          <h2>Vas construyendo tu camino.</h2>
          <ProgressBar value={hours} total={REQUIRED_HOURS} />
          <small className="config-note">Meta configurable desde src/data/constants.js</small>
        </div>
      </div>
      <section className="history-section">
        <div className="section-top">
          <div>
            <span className="eyebrow">TU RECORRIDO</span>
            <h2>Historial de actividades</h2>
          </div>
          <span className="history-total">{hours} h completadas</span>
        </div>
        {mine.length ? (
          mine.map((a) => <HistoryRow key={a.id} a={a} completed />)
        ) : (
          <div className="empty-inline">
            Aún no tienes actividades cursadas. Cuando completes una actividad, aparecerá aquí.
          </div>
        )}
      </section>
      <section className="history-section">
        <h2>Mis próximas actividades</h2>
        {enrolled.length ? (
          enrolled.map((a) => <HistoryRow key={a.id} a={a} />)
        ) : (
          <div className="empty-inline">
            Todavía no tienes inscripciones. <Link to="/actividades">Explora actividades</Link>.
          </div>
        )}
      </section>
    </section>
  );
}
function HistoryRow({ a, completed }) {
  return (
    <Link to={`/actividad/${a.id}`} className="history-row">
      <span className="history-icon">
        <Icon name={completed ? 'check' : 'calendar'} />
      </span>
      <span>
        <b>{a.nombre}</b>
        <small>
          {dateLabel(a.fecha)} · {a.lugar}
        </small>
      </span>
      <strong>{a.horas} h</strong>
    </Link>
  );
}
export function Favoritos() {
  const { favorites } = useApp(),
    mine = activities.filter((a) => favorites.includes(a.id));
  return (
    <section className="section page-section">
      <Heading
        eyebrow="GUARDADOS PARA TI"
        title="Mis favoritos"
        subtitle="Tus actividades guardadas, todas en un mismo lugar."
      />
      {mine.length ? (
        <div className="activity-grid">
          {mine.map((a) => (
            <ActivityCard key={a.id} activity={a} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>♡</span>
          <h3>Aún no tienes favoritos</h3>
          <p>Guarda las actividades que te interesan tocando el corazón.</p>
          <Link className="button primary" to="/actividades">
            Explorar actividades
          </Link>
        </div>
      )}
    </section>
  );
}
export function FAQ() {
  const items = [
    {
      q: '¿Qué son las horas libres (HL)?',
      a: 'Son horas que puedes reconocer participando en actividades formativas, culturales, deportivas, académicas y de voluntariado de la comunidad UNAB.',
    },
    {
      q: '¿Cuántas horas debo completar?',
      a: `La meta de referencia es de ${REQUIRED_HOURS} horas. Consulta con tu programa académico si tienes un requisito específico.`,
    },
    {
      q: '¿Cómo me inscribo a una actividad?',
      a: 'Puedes inscribirte desde la tarjeta de actividad, desde su detalle o al seleccionarla en el mapa. La inscripción queda guardada en este dispositivo.',
    },
    {
      q: '¿Cómo se actualiza mi historial?',
      a: 'En esta versión de demostración, las inscripciones y favoritos se guardan localmente. El historial muestra las actividades cursadas que marques como completadas.',
    },
    {
      q: '¿Necesito una cuenta?',
      a: 'Puedes explorar actividades sin iniciar sesión. Para usar tu perfil y consultar favoritos guardados, crea una cuenta o inicia sesión.',
    },
    {
      q: '¿Dónde consulto el lugar de una actividad?',
      a: 'Cada actividad muestra el lugar y puedes ubicarla en el mapa interactivo del campus.',
    },
  ];
  return (
    <section className="section page-section faq-section">
      <Heading
        eyebrow="TE ACOMPAÑAMOS"
        title="Preguntas frecuentes"
        subtitle="Todo lo que necesitas saber para aprovechar tus horas HL."
      />
      <Accordion items={items} />
      <div className="faq-contact">
        <h2>¿Tienes otra pregunta?</h2>
        <p>Acércate a los canales de atención de la Universidad Autónoma de Bucaramanga.</p>
        <a href="https://unab.edu.co">
          Visitar unab.edu.co <Icon name="arrow" size={16} />
        </a>
      </div>
    </section>
  );
}
export function Auth({ register = false }) {
  const { setUser } = useApp(),
    nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' }),
    [error, setError] = useState('');
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  function submit(e) {
    e.preventDefault();
    if (register && !form.name.trim()) return setError('Escribe tu nombre completo.');
    if (!form.email.trim() || !form.password)
      return setError('Completa el correo y la contraseña.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return setError('Ingresa un correo electrónico válido.');
    if (form.password.length < 8)
      return setError('La contraseña debe tener al menos 8 caracteres.');
    if (register && form.password !== form.confirm)
      return setError('Las contraseñas no coinciden.');
    setUser({ name: register ? form.name.trim() : form.email.split('@')[0], email: form.email });
    nav('/perfil');
  }
  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <Link to="/" className="brand">
          <span className="brand-mark">OH</span>
          <span>
            Our<span className="orange">Hours</span>
          </span>
        </Link>
        <span className="eyebrow">COMUNIDAD UNAB</span>
        <h1>{register ? 'Crea tu cuenta' : 'Qué bueno verte'}</h1>
        <p>
          {register
            ? 'Empieza a llevar el control de tus horas HL.'
            : 'Inicia sesión para consultar tu recorrido.'}
        </p>
        <form onSubmit={submit} noValidate>
          {register && (
            <label>
              Nombre completo
              <input
                name="name"
                value={form.name}
                onChange={change}
                placeholder="Tu nombre"
                autoComplete="name"
              />
            </label>
          )}
          <label>
            Correo electrónico
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={change}
              placeholder="nombre@unab.edu.co"
              autoComplete="email"
            />
          </label>
          <label>
            Contraseña
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={change}
              placeholder="Mínimo 8 caracteres"
              autoComplete={register ? 'new-password' : 'current-password'}
            />
          </label>
          {register && (
            <label>
              Confirmar contraseña
              <input
                name="confirm"
                type="password"
                value={form.confirm}
                onChange={change}
                placeholder="Repite tu contraseña"
                autoComplete="new-password"
              />
            </label>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button primary auth-submit">
            {register ? 'Crear cuenta' : 'Iniciar sesión'} <Icon name="arrow" size={17} />
          </button>
        </form>
        <p className="auth-switch">
          {register ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?'}{' '}
          <Link to={register ? '/login' : '/registro'}>
            {register ? 'Inicia sesión' : 'Regístrate'}
          </Link>
        </p>
        <small>Acceso de demostración · Tus datos se guardan en este dispositivo.</small>
      </div>
    </section>
  );
}
