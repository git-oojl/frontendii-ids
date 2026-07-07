import { useCallback, useEffect, useState } from "react";
import "./App.css";
import CarList from "./components/CarList.jsx";
import EmptyState from "./components/EmptyState.jsx";
import FilterBar from "./components/FilterBar.jsx";
import Pagination from "./components/Pagination.jsx";
import TheorySection from "./components/TheorySection.jsx";

const API_URL = "http://localhost:8000/api/cars/";

function App() {
  const [cars, setCars] = useState([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [availabilityFilter, setAvailabilityFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCars = useCallback(async (url = null) => {
    const requestUrl = url ?? (() => {
      const apiUrl = new URL(API_URL);

      if (availabilityFilter === "Disponibles") {
        apiUrl.searchParams.set("is_available", "true");
      }

      if (availabilityFilter === "Vendidos") {
        apiUrl.searchParams.set("is_available", "false");
      }

      if (searchTerm.trim() !== "") {
        apiUrl.searchParams.set("search", searchTerm.trim());
      }

      return apiUrl.toString();
    })();
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(requestUrl);

      if (!response.ok) {
        throw new Error("No se pudo conectar con la API.");
      }

      const data = await response.json();

      setCars(data.results);
      setCount(data.count);
      setNext(data.next);
      setPrevious(data.previous);
    } catch (error) {
      setCars([]);
      setCount(0);
      setNext(null);
      setPrevious(null);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [availabilityFilter, searchTerm]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const visibleCars = cars.filter((car) => {
    const matchesAvailability =
      availabilityFilter === "Todos" ||
      (availabilityFilter === "Disponibles" && car.is_available) ||
      (availabilityFilter === "Vendidos" && !car.is_available);

    const text = `${car.brand} ${car.model}`.toLowerCase();
    const matchesSearch = text.includes(searchTerm.trim().toLowerCase());

    return matchesAvailability && matchesSearch;
  });

  return (
    <div className="container">
      <header className="header">
        <h1>Agencia de carros</h1>
        <p className="descripcion">
          Inventario conectado a Django REST Framework usando React, fetch y componentes.
        </p>
      </header>

      <FilterBar
        availabilityFilter={availabilityFilter}
        onAvailabilityChange={setAvailabilityFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <section className="card resumen-grid">
        <div className="resumen-item">
          <span>Total en API</span>
          <strong>{count}</strong>
        </div>

        <div className="resumen-item">
          <span>En esta página</span>
          <strong>{visibleCars.length}</strong>
        </div>

        <div className="resumen-item">
          <span>Filtro</span>
          <strong>{availabilityFilter}</strong>
        </div>
      </section>

      <section className="card">
        <div className="section-header">
          <div>
            <h2>Lista de carros</h2>
            <p className="nota-simple">Resultados cargados desde /api/cars/</p>
          </div>
        </div>

        {error !== "" && <p className="mensaje-error">{error}</p>}
        {isLoading && <p className="mensaje-regular">Cargando carros...</p>}

        {!isLoading && error === "" && visibleCars.length === 0 ? (
          <EmptyState message="No cars found" />
        ) : (
          <CarList cars={visibleCars} />
        )}

        <Pagination
          previous={previous}
          next={next}
          isLoading={isLoading}
          onPageChange={fetchCars}
        />
      </section>

      <TheorySection />

      <footer className="footer">Ortiz Osuna José Luis | 09IDPRMA</footer>
    </div>
  );
}

export default App;
