export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="filters">
      <label>
        Tipo
        <select
          value={filters.tipo}
          onChange={(e) => setFilters({ ...filters, tipo: e.target.value })}
        >
          <option value="">Todos</option>
          {['cultural', 'deportiva', 'académica', 'voluntariado'].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </label>
      <label>
        Fecha
        <select
          value={filters.fecha}
          onChange={(e) => setFilters({ ...filters, fecha: e.target.value })}
        >
          <option value="">Cualquier fecha</option>
          <option value="today">Hoy</option>
          <option value="week">Próximos 7 días</option>
        </select>
      </label>
      <label>
        Horas
        <select
          value={filters.horas}
          onChange={(e) => setFilters({ ...filters, horas: e.target.value })}
        >
          <option value="">Cualquier duración</option>
          <option value="2">2 horas</option>
          <option value="3">3 horas o más</option>
        </select>
      </label>
    </div>
  );
}
