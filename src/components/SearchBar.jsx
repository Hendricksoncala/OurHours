import Icon from './Icons';
export default function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar actividad o lugar...',
}) {
  return (
    <label className="searchbar">
      <Icon name="search" />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      {value && (
        <button onClick={() => onChange('')} aria-label="Limpiar búsqueda">
          ×
        </button>
      )}
    </label>
  );
}
