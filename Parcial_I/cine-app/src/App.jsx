import { useState } from "react";
import "./App.css";

function App() {
  // Variables del sistema
  const nombreCine = "Cine Central";
  const precioBoleto = 80;
  const porcentajeCargoServicio = 0.10;
  const porcentajeDescuentoGrupal = 0.15;

  const peliculas = [
  {
    id: 1,
    nombre: "Intensamente 2",
    poster: "/posters/Inside_Out_2_poster.jpg",
  },
  {
    id: 2,
    nombre: "Frozen",
    poster: "/posters/Frozen_(2013_film)_poster.jpg",
  },
  {
    id: 3,
    nombre: "Toy Story",
    poster: "/posters/Toy_Story.jpg",
  },
];

  // Estados de la aplicación
  const [nombreCliente, setNombreCliente] = useState("");
  const [cantidadBoletos, setCantidadBoletos] = useState(0);
  const [tipoSala, setTipoSala] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(peliculas[0]);

  // Conversión y validación de cantidad
  const cantidadNumerica = Number(cantidadBoletos);

  const cantidadValida =
    Number.isInteger(cantidadNumerica) && cantidadNumerica > 0;

  // Evita calcular cargos o descuentos con valores inválidos
  const cantidadParaCalculo = cantidadValida ? cantidadNumerica : 0;

  // Cálculos dinámicos
  const subtotal = precioBoleto * cantidadParaCalculo;
  const cargoServicio = subtotal * porcentajeCargoServicio;

  const descuento =
    cantidadValida && cantidadNumerica >= 5
      ? subtotal * porcentajeDescuentoGrupal
      : 0;

  const totalFinal = subtotal + cargoServicio - descuento;

  const porcentajeCargoMostrado = porcentajeCargoServicio * 100;
  const porcentajeDescuentoMostrado = porcentajeDescuentoGrupal * 100;

  const limpiarResultadoAnterior = () => {
    setMensaje("");
    setMostrarResumen(false);
  };

  const realizarReservacion = () => {
    if (nombreCliente.trim() === "") {
      alert("Reservación rechazada: escribe el nombre del cliente.");
      setMensaje("Completa todos los campos antes de realizar la reservación.");
      return;
    }

    if (!cantidadValida) {
      alert(
        "Reservación rechazada: la cantidad de boletos debe ser un número entero mayor a cero."
      );
      setMensaje("Completa todos los campos antes de realizar la reservación.");
      return;
    }

    if (tipoSala === "") {
      alert("Reservación rechazada: selecciona un tipo de sala.");
      setMensaje("Completa todos los campos antes de realizar la reservación.");
      return;
    }

    setMensaje("Reservación realizada con éxito.");
  };

  const verResumen = () => {
    setMostrarResumen(!mostrarResumen);
  };

  const reiniciarReservacion = () => {
    setNombreCliente("");
    setCantidadBoletos(0);
    setTipoSala("");
    setMensaje("");
    setMostrarResumen(false);
    setPeliculaSeleccionada(peliculas[0]);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>{nombreCine}</h1>
        <p className="descripcion">
          Sistema de reservaciones para una función de cine.
        </p>
      </header>

      {/* Sección 1: Información de la película */}
      <div className="card">
        <h2>Cartelera</h2>

        <div className="cartelera">
          {peliculas.map((pelicula) => (
            <button
              key={pelicula.id}
              type="button"
              className={
                peliculaSeleccionada.id === pelicula.id
                  ? "pelicula seleccionada"
                  : "pelicula"
              }
              onClick={() => {
                setPeliculaSeleccionada(pelicula);
                limpiarResultadoAnterior();
              }}
              aria-pressed={peliculaSeleccionada.id === pelicula.id}
            >
              <img
                className="poster"
                src={pelicula.poster}
                alt={`Póster de ${pelicula.nombre}`}
              />

              <div className="pelicula-overlay">
                <span className="pelicula-nombre">{pelicula.nombre}</span>

                {peliculaSeleccionada.id === pelicula.id && (
                  <span className="pelicula-estado"></span>
                )}
              </div>
            </button>
          ))}
        </div>

        <h3>Información de la película</h3>

        <p>
          <strong>Película seleccionada:</strong> {peliculaSeleccionada.nombre}
        </p>

        <p>
          <strong>Precio por boleto:</strong> ${precioBoleto.toFixed(2)}
        </p>

        <p>
          <strong>Cargo por servicio:</strong> {porcentajeCargoMostrado}%
        </p>

        <p>
          <strong>Descuento grupal:</strong>{" "}
          {porcentajeDescuentoMostrado}% a partir de 5 boletos
        </p>
      </div>

      {/* Sección 2: Información del cliente */}
      <div className="card">
        <h2>Información del cliente</h2>

        <label>Nombre del cliente:</label>
        <input
          className="input"
          type="text"
          placeholder="Escribe tu nombre"
          value={nombreCliente}
          onChange={(event) => setNombreCliente(event.target.value)}
        />

        <p>
          <strong>Cliente:</strong> {nombreCliente || "Sin nombre"}
        </p>
      </div>

      {/* Sección 3: Información de la reservación */}
      <div className="card">
        <h2>Información de la reservación</h2>

        <label>Cantidad de boletos:</label>
        <input
          className="input"
          type="number"
          min="0"
          step="1"
          value={cantidadBoletos}
          onChange={(event) => setCantidadBoletos(event.target.value)}
        />

        <label>Tipo de sala:</label>
        <select
          className="input"
          value={tipoSala}
          onChange={(event) => setTipoSala(event.target.value)}
        >
          <option value="">Selecciona un tipo de sala</option>
          <option value="Regular">Regular</option>
          <option value="VIP">VIP</option>
          <option value="IMAX">IMAX</option>
        </select>

        {cantidadNumerica === 0 ? (
          <p className="mensaje-regular">
            Selecciona al menos un boleto.
          </p>
        ) : !cantidadValida ? (
          <p className="mensaje-regular">
            Ingresa una cantidad válida de boletos.
          </p>
        ) : cantidadNumerica >= 5 ? (
          <p className="mensaje-exito">
            Descuento grupal aplicado.
          </p>
        ) : (
          <p className="mensaje-regular">
            Reservación regular.
          </p>
        )}

        <div className="acciones">
          <button className="btn" onClick={realizarReservacion}>
            Realizar reservación
          </button>

          <button className="btn" onClick={verResumen}>
            {mostrarResumen ? "Ocultar resumen" : "Mostrar resumen"}
          </button>

          <button
            className="btn btn-peligro"
            onClick={reiniciarReservacion}
          >
            Reiniciar reservación
          </button>
        </div>

        {mensaje && <p className="nota">{mensaje}</p>}
      </div>

      {/* Sección 4: Resumen de compra */}
      <div className="card">
        <h2>Resumen de compra</h2>

        {mostrarResumen ? (
          <>
            <p className="nota">
              Gracias por tu reservación, {nombreCliente || "cliente"}.
            </p>

            <table className="tabla">
              <thead>
                <tr>
                  <th>Concepto</th>
                  <th>Información</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Película</td>
                  <td>{peliculaSeleccionada.nombre}</td>
                </tr>

                <tr>
                  <td>Tipo de sala</td>
                  <td>{tipoSala || "No seleccionada"}</td>
                </tr>

                <tr>
                  <td>Boletos</td>
                  <td>{cantidadParaCalculo}</td>
                </tr>

                <tr>
                  <td>Subtotal</td>
                  <td>${subtotal.toFixed(2)}</td>
                </tr>

                <tr>
                  <td>Cargo por servicio</td>
                  <td>${cargoServicio.toFixed(2)}</td>
                </tr>

                <tr>
                  <td>Descuento grupal</td>
                  <td>${descuento.toFixed(2)}</td>
                </tr>

                <tr>
                  <td>
                    <strong>Total final</strong>
                  </td>
                  <td>
                    <strong>${totalFinal.toFixed(2)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <p className="nota">
            Presiona “Mostrar resumen” para ver los detalles de la compra.
          </p>
        )}
      </div>

      <footer className="footer">
        Práctica 2 - Sistema de Reservaciones para un Cine
      </footer>
    </div>
  );
}

export default App;