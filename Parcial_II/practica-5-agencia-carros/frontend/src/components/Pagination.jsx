function Pagination(props) {
  return (
    <div className="acciones pagination">
      <button
        className="btn"
        disabled={props.previous === null || props.isLoading}
        onClick={() => props.onPageChange(props.previous)}
      >
        Anterior
      </button>

      <button
        className="btn"
        disabled={props.next === null || props.isLoading}
        onClick={() => props.onPageChange(props.next)}
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;
