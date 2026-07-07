import StudentCard from "./StudentCard.jsx";

function StudentList(props) {
  return (
    <div className="card">
      <h2>Lista de estudiantes</h2>

      <div className="acciones filtros">
        <button
          className={props.filtro === "Todos" ? "btn activo" : "btn"}
          onClick={() => props.setFiltro("Todos")}
        >
          Todos
        </button>

        <button
          className={props.filtro === "Aprobados" ? "btn activo" : "btn"}
          onClick={() => props.setFiltro("Aprobados")}
        >
          Aprobados
        </button>

        <button
          className={props.filtro === "Reprobados" ? "btn activo" : "btn"}
          onClick={() => props.setFiltro("Reprobados")}
        >
          Reprobados
        </button>
      </div>

      <p className="nota">Filtro seleccionado: {props.filtro}</p>

      {props.totalStudents === 0 ? (
        <p className="mensaje-regular">No hay estudiantes registrados todavía.</p>
      ) : props.students.length === 0 ? (
        <p className="mensaje-regular">
          No hay estudiantes para el filtro seleccionado: {props.filtro}.
        </p>
      ) : (
        <div className="student-grid">
          {props.students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={props.onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentList;