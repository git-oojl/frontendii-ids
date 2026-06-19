import { useState } from "react";
import "./App.css";

function App() {
  // Estado para los campos del formulario
  const [nombreCliente, setNombreCliente] = useState("");
  const [personas, setPersonas] = useState("");
  const [hora, setHora] = useState("");
  const [tipoMesa, setTipoMesa] = useState("Interior");

  // Estado para la lista de reservaciones
  const [reservaciones, setReservaciones] = useState([]);

  // Estado para el buscador
  const [busqueda, setBusqueda] = useState("");

  const agregarReservacion = () => {
    if (nombreCliente.trim() === "") {
      alert("No se puede agregar la reservación: escribe el nombre del cliente.");
      return;
    }

    if (personas === "" || Number(personas) <= 0) {
      alert("No se puede agregar la reservación: escribe un número válido de personas.");
      return;
    }

    if (hora.trim() === "") {
      alert("No se puede agregar la reservación: selecciona la hora de la reservación.");
      return;
    }

    const nuevaReservacion = {
      id: Date.now(),
      nombreCliente,
      personas,
      hora,
      tipoMesa
    };

    setReservaciones([...reservaciones, nuevaReservacion]);

    setNombreCliente("");
    setPersonas("");
    setHora("");
    setTipoMesa("Interior");
  };

  const eliminarReservacion = (id) => {
    const reservacionesActualizadas = reservaciones.filter(
      (reservacion) => reservacion.id !== id
    );

    setReservaciones(reservacionesActualizadas);
  };

  const reservacionesFiltradas = reservaciones.filter((reservacion) =>
    reservacion.nombreCliente.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <h1>Restaurante</h1>
        <p className="descripcion">
          Administra las reservaciones del restaurante mediante este sistema.
        </p>
      </header>

      <div className="card">
        <h2>Nueva reservación</h2>

        <label>Nombre del cliente:</label>
        <input
          className="input"
          type="text"
          placeholder="Escribe el nombre del cliente"
          value={nombreCliente}
          onChange={(event) => setNombreCliente(event.target.value)}
        />

        <label>Número de personas:</label>
        <input
          className="input"
          type="number"
          min="1"
          placeholder="Ejemplo: 4"
          value={personas}
          onChange={(event) => setPersonas(event.target.value)}
        />

        <label>Hora de la reservación:</label>
        <input
          className="input"
          type="time"
          value={hora}
          onChange={(event) => setHora(event.target.value)}
        />

        <label>Tipo de mesa:</label>
        <select
          className="input"
          value={tipoMesa}
          onChange={(event) => setTipoMesa(event.target.value)}
        >
          <option>Interior</option>
          <option>Exterior</option>
          <option>VIP</option>
          <option>Área familiar</option>
        </select>

        <button className="btn" onClick={agregarReservacion}>
          Agregar reservación
        </button>
      </div>

      <div className="card">
        <h2>Buscar reservaciones</h2>

        <label>Buscar por nombre del cliente:</label>
        <input
          className="input"
          type="text"
          placeholder="Escribe un nombre"
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
        />

        <p className="nota">
          Total de reservaciones: {reservaciones.length}
        </p>
      </div>

      <div className="card">
        <h2>Lista de reservaciones</h2>

        {reservaciones.length === 0 ? (
          <p className="mensaje-regular">No hay reservaciones todavía.</p>
        ) : reservacionesFiltradas.length === 0 ? (
          <p className="mensaje-regular">
            No se encontraron reservaciones con ese nombre.
          </p>
        ) : (
          reservacionesFiltradas.map((reservacion) => (
            <div className="card" key={reservacion.id}>
              <h3>{reservacion.nombreCliente}</h3>

              <p>
                <strong>Personas:</strong> {reservacion.personas}
              </p>

              <p>
                <strong>Hora:</strong> {reservacion.hora}
              </p>

              <p>
                <strong>Mesa:</strong> {reservacion.tipoMesa}
              </p>

              <button
                className="btn btn-peligro"
                onClick={() => eliminarReservacion(reservacion.id)}
              >
                Cancelar reservación
              </button>
            </div>
          ))
        )}
      </div>

      <footer className="footer">
        Práctica 3 - Curso de React
      </footer>
    </div>
  );
}

export default App;