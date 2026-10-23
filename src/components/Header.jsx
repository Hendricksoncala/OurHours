import { Link } from 'react-router-dom';
import Icon from './Icons';
import { useApp } from '../context/AppContext';
export default function Header() {
  const { theme, toggleTheme, user } = useApp();
  return (
    <header className="header">
      <Link to="/" className="brand">
        <span className="brand-mark">OH</span>
        <span>
          Our<span className="orange">Hours</span>
          <small>UNAB · Bucaramanga</small>
        </span>
      </Link>
      <nav className="top-links">
        <Link to="/actividades">Actividades</Link>
        <Link to="/faq">Preguntas frecuentes</Link>
        {user ? (
          <Link to="/perfil">Mi perfil</Link>
        ) : (
          <Link to="/login" className="login-link">
            Iniciar sesión
          </Link>
        )}
      </nav>
      <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
        <Icon name={theme === 'light' ? 'moon' : 'sun'} />
      </button>
    </header>
  );
}
