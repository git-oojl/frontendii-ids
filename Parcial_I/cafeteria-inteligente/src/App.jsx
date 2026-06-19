import { useState } from "react";
import "./App.css";

function App() {
  // Datos base del café
  const nombreCafe = "Latte";
  const precioBase = 6;
  const porcentajeImpuesto = 0.08;
  const porcentajeDescuento = 0.15;

  // Estados de la aplicación
  const [nombreCliente, setNombreCliente] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [pedidoRealizado, setPedidoRealizado] = useState(false);
  const [mostrarResumen, setMostrarResumen] = useState(false);

  const nombreClienteLimpio = nombreCliente.trim();
  const cantidadTexto = String(cantidad).trim();

  const cantidadEsEntera = /^-?\d+$/.test(cantidadTexto);
  const cantidadNumerica = cantidadEsEntera ? Number(cantidadTexto) : NaN;
  const cantidadTieneCeroInicial = /^0\d+/.test(cantidadTexto);

  const cantidadValida =
    cantidadTexto !== "" &&
    cantidadEsEntera &&
    cantidadNumerica > 0 &&
    !cantidadTieneCeroInicial;

  // Solo se usa para cálculos si la cantidad tiene sentido
  const cantidadParaCalculos = cantidadValida ? cantidadNumerica : 0;

  const subtotal = precioBase * cantidadParaCalculos;
  const impuesto = subtotal * porcentajeImpuesto;

  // Aplica descuento solo si la cantidad es válida y mayor a 5
  const descuento =
    cantidadValida && cantidadParaCalculos > 5
      ? subtotal * porcentajeDescuento
      : 0;

  // Calcula el total final del pedido
  const totalFinal = subtotal + impuesto - descuento;

  const validarPedido = () => {
    if (nombreClienteLimpio === "") {
      alert("Pedido rechazado: escribe el nombre del cliente.");
      return false;
    }

    if (cantidadTexto === "") {
      alert("Pedido rechazado: escribe la cantidad de cafés.");
      return false;
    }

    if (!cantidadEsEntera) {
      alert("Pedido rechazado: la cantidad debe ser un número entero.");
      return false;
    }

    if (cantidadNumerica < 0) {
      alert("Pedido rechazado: la cantidad no puede estar por debajo de cero.");
      return false;
    }

    if (cantidadNumerica === 0) {
      alert("Pedido rechazado: la cantidad debe ser mayor que cero.");
      return false;
    }

    if (cantidadTieneCeroInicial) {
      alert("Pedido rechazado: la cantidad no debe iniciar con cero. Ejemplo inválido: 09999.");
      return false;
    }

    return true;
  };

  const realizarPedido = () => {
    if (!validarPedido()) {
      setPedidoRealizado(false);
      setMostrarResumen(false);
      return;
    }

    setPedidoRealizado(true);
    setMostrarResumen(true);
  };

  // Muestra u oculta el resumen de compra
  const verResumen = () => {
    setMostrarResumen(!mostrarResumen);
  };

  // Limpia los datos y reinicia el pedido
  const reiniciarPedido = () => {
    setNombreCliente("");
    setCantidad(0);
    setPedidoRealizado(false);
    setMostrarResumen(false);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Cafetería</h1>
        <p className="descripcion">
          Realiza tu pedido mediante este sistema.
        </p>
      </header>

      <div className="card">
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

      <div className="card">
        <h2>Detalles del pedido</h2>

        <p>
          <strong>Café:</strong> {nombreCafe}
        </p>

        <p>
          <strong>Precio base:</strong> ${precioBase}
        </p>

        <label>Cantidad de cafés:</label>
        <input
          className="input"
          type="text"
          inputMode="numeric"
          placeholder="Ejemplo: 2"
          value={cantidad}
          onChange={(event) => setCantidad(event.target.value)}
        />

        {!cantidadValida ? (
          <p className="mensaje-regular">
            Ingresa una cantidad válida para calcular el pedido.
          </p>
        ) : cantidadParaCalculos > 5 ? (
          <p className="mensaje-exito">
            Descuento aplicado!
          </p>
        ) : (
          <p className="mensaje-regular">Pedido regular</p>
        )}
      </div>

      <div className="acciones">
        <button className="btn" onClick={realizarPedido}>
          Realizar pedido
        </button>

        <button className="btn" onClick={verResumen}>
          {mostrarResumen ? "Ocultar resumen" : "Mostrar resumen"}
        </button>

        <button className="btn btn-peligro" onClick={reiniciarPedido}>
          Reiniciar pedido
        </button>
      </div>

      {mostrarResumen && (
        <div className="card">
          <h2>Resumen de compra</h2>

          <table className="tabla">
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Cantidad</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>${subtotal.toFixed(2)}</td>
              </tr>

              <tr>
                <td>Impuesto</td>
                <td>${impuesto.toFixed(2)}</td>
              </tr>

              <tr>
                <td>Descuento</td>
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

          {pedidoRealizado && (
            <p className="nota">Pedido realizado con éxito</p>
          )}

          <p className="nota">
            Gracias por tu compra, {nombreCliente || "cliente"}.
          </p>
        </div>
      )}

      <footer className="footer">
        Ortiz Osuna José Luis | 09IDPRMA
      </footer>
    </div>
  );
}

export default App;