function FilterBar(props) {
  return (
    <section className="card">
      <h2>Filtros</h2>

      <label>Buscar por marca o modelo:</label>
      <input
        className="input"
        type="text"
        placeholder="Ejemplo: Toyota, Corolla, Honda o Civic"
        value={props.searchTerm}
        onChange={(event) => props.onSearchChange(event.target.value)}
      />

      <div className="acciones filtros">
        <button
          className={props.availabilityFilter === "Todos" ? "btn activo" : "btn"}
          onClick={() => props.onAvailabilityChange("Todos")}
        >
          Todos
        </button>

        <button
          className={
            props.availabilityFilter === "Disponibles" ? "btn activo" : "btn"
          }
          onClick={() => props.onAvailabilityChange("Disponibles")}
        >
          Disponibles
        </button>

        <button
          className={props.availabilityFilter === "Vendidos" ? "btn activo" : "btn"}
          onClick={() => props.onAvailabilityChange("Vendidos")}
        >
          Vendidos
        </button>
      </div>

      <p className="nota">Filtro seleccionado: {props.availabilityFilter}</p>
    </section>
  );
}

export default FilterBar;
