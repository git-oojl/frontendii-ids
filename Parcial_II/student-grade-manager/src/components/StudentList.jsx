import StudentCard from "./StudentCard.jsx";

function StudentList(props) {
  return (
    <div className="card">
      <h2>Lista de estudiantes</h2>

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
