import { NavLink } from 'react-router-dom';
import Icon from './Icons';
const links = [
  ['/', 'Inicio', 'home'],
  ['/mapa', 'Mapa', 'map'],
  ['/calendario', 'Calendario', 'calendar'],
  ['/favoritos', 'Favoritos', 'heart'],
  ['/perfil', 'Perfil', 'user'],
];
export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {links.map(([to, label, icon]) => (
        <NavLink key={to} to={to} end={to === '/'}>
          <Icon name={icon} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
