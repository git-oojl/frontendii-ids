import CarCard from "./CarCard.jsx";

function CarList(props) {
  return (
    <div className="car-grid">
      {props.cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

export default CarList;
