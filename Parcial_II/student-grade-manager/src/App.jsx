import { useState } from "react";
import "./App.css";
import StudentForm from "./components/StudentForm.jsx";
import StudentList from "./components/StudentList.jsx";

function App() {
  // Estado principal de la lista de estudiantes
  const [students, setStudents] = useState([]);

  // Estado para el filtro de estudiantes
  const [filtro, setFiltro] = useState("Todos");

  const addStudent = (studentData) => {
    const newStudent = {
      id: Date.now(),
      name: studentData.name.trim(),
      course: studentData.course,
      grade: Number(studentData.grade)
    };

    setStudents([...students, newStudent]);
  };

  const deleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);

    setStudents(updatedStudents);
  };

  const totalStudents = students.length;

  const passedStudents = students.filter((student) => student.grade >= 70).length;
  const failedStudents = students.filter((student) => student.grade < 70).length;

  const classAverage =
    totalStudents === 0
      ? 0
      : students.reduce((total, student) => total + student.grade, 0) /
        totalStudents;

  const filteredStudents = students.filter((student) => {
    if (filtro === "Aprobados") {
      return student.grade >= 70;
    }

    if (filtro === "Reprobados") {
      return student.grade < 70;
    }

    return true;
  });

  return (
    <div className="container">
      <header className="header">
        <h1>Gestor de calificaciones</h1>
        <p className="descripcion">
          Administra estudiantes, cursos y calificaciones mediante componentes y props.
        </p>
      </header>

      <StudentForm onAddStudent={addStudent} />

      <div className="card resumen-grid">
        <div className="resumen-item">
          <span>Total de estudiantes</span>
          <strong>{totalStudents}</strong>
        </div>

        <div className="resumen-item">
          <span>Promedio general</span>
          <strong>{classAverage.toFixed(1)}</strong>
        </div>

        <div className="resumen-item">
          <span>Aprobados</span>
          <strong>{passedStudents}</strong>
        </div>

        <div className="resumen-item">
          <span>Reprobados</span>
          <strong>{failedStudents}</strong>
        </div>
      </div>

      <StudentList
        students={filteredStudents}
        totalStudents={totalStudents}
        filtro={filtro}
        setFiltro={setFiltro}
        onDelete={deleteStudent}
      />

      <footer className="footer">
        Ortiz Osuna José Luis | 09IDPRMA
      </footer>
    </div>
  );
}

export default App;