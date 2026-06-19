import { useState } from "react";

function StudentForm(props) {
  // Estados para los campos del formulario
  const [name, setName] = useState("");
  const [course, setCourse] = useState("React");
  const [grade, setGrade] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const gradeNumber = Number(grade);

    if (name.trim() === "") {
      alert("No se puede agregar el estudiante: escribe el nombre.");
      return;
    }

    if (grade === "") {
      alert("No se puede agregar el estudiante: escribe la calificación.");
      return;
    }

    if (!Number.isFinite(gradeNumber) || gradeNumber < 0 || gradeNumber > 100) {
      alert("No se puede agregar el estudiante: la calificación debe estar entre 0 y 100.");
      return;
    }

    props.onAddStudent({ name, course, grade: gradeNumber });

    setName("");
    setCourse("React");
    setGrade("");
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Nuevo estudiante</h2>

      <label>Nombre del estudiante:</label>
      <input
        className="input"
        type="text"
        placeholder="Ejemplo: Juan Pablo"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label>Curso:</label>
      <select
        className="input"
        value={course}
        onChange={(event) => setCourse(event.target.value)}
      >
        <option value="React">React</option>
        <option value="JavaScript">JavaScript</option>
        <option value="HTML/CSS">HTML/CSS</option>
      </select>

      <label>Calificación:</label>
      <input
        className="input"
        type="number"
        min="0"
        max="100"
        step="0.1"
        placeholder="Ejemplo: 95"
        value={grade}
        onChange={(event) => setGrade(event.target.value)}
      />

      <button className="btn" type="submit">
        Agregar estudiante
      </button>
    </form>
  );
}

export default StudentForm;
