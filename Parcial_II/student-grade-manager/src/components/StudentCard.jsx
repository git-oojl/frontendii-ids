function StudentCard(props) {
  const status = props.student.grade >= 70 ? "Aprobado" : "Reprobado";

  return (
    <div className="student-card">
      <div className="student-card-header">
        <h3>{props.student.name}</h3>
        <span
          className={
            status === "Aprobado" ? "badge badge-exito" : "badge badge-peligro"
          }
        >
          {status}
        </span>
      </div>

      <p>
        <strong>Curso:</strong> {props.student.course}
      </p>

      <p>
        <strong>Calificación:</strong> {props.student.grade}
      </p>

      <p>
        <strong>Estado:</strong> {status}
      </p>

      <button
        className="btn btn-peligro"
        onClick={() => props.onDelete(props.student.id)}
      >
        Eliminar estudiante
      </button>
    </div>
  );
}

export default StudentCard;
