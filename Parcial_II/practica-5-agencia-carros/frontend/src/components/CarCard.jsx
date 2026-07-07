function CarCard(props) {
  const status = props.car.is_available ? "Disponible" : "Vendido";
  const price = Number(props.car.price).toLocaleString("es-MX", {
    style: "currency",
    currency: "USD",
  });
  const mileage = Number(props.car.mileage).toLocaleString("es-MX");

  return (
    <article className="car-card">
      <div className="car-card-header">
        <div>
          <h3>
            {props.car.brand} {props.car.model}
          </h3>
          <p className="muted">Año {props.car.year}</p>
        </div>

        <span
          className={
            props.car.is_available ? "badge badge-exito" : "badge badge-peligro"
          }
        >
          {status}
        </span>
      </div>

      <div className="car-info">
        <p>
          <strong>Precio:</strong> {price}
        </p>
        <p>
          <strong>Kilometraje:</strong> {mileage} km
        </p>
        <p>
          <strong>Color:</strong> {props.car.color}
        </p>
        <p>
          <strong>Transmisión:</strong> {props.car.transmission}
        </p>
        <p>
          <strong>Combustible:</strong> {props.car.fuel_type}
        </p>
        <p>
          <strong>Disponibilidad:</strong> {status}
        </p>
      </div>
    </article>
  );
}

export default CarCard;
