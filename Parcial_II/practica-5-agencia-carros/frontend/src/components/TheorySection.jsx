function TheorySection() {
  return (
    <section className="card teoria">
      <h2>Parte teórica</h2>

      <div className="pregunta">
        <h3>1. ¿Cuál es la responsabilidad de Django en esta práctica?</h3>
        <p>
          Django se encarga del backend: guardar los carros, crear el modelo,
          manejar la base de datos y entregar la información por medio de la API.
        </p>
      </div>

      <div className="pregunta">
        <h3>2. ¿Cuál es la responsabilidad de React?</h3>
        <p>
          React se encarga del frontend: mostrar la interfaz, consumir la API,
          mostrar las tarjetas, buscar, filtrar y cambiar de página sin recargar.
        </p>
      </div>

      <div className="pregunta">
        <h3>3. ¿Qué es una API REST?</h3>
        <p>
          Es una forma de comunicar sistemas usando endpoints. En esta práctica,
          React consulta el endpoint /api/cars/ para recibir datos en formato JSON.
        </p>
      </div>

      <div className="pregunta">
        <h3>4. ¿Qué hace un serializer en Django REST Framework?</h3>
        <p>
          Convierte los objetos del modelo Car en JSON para que React pueda leerlos.
          También puede validar datos cuando se reciben desde una petición.
        </p>
      </div>

      <div className="pregunta">
        <h3>5. ¿Por qué necesitamos CORS para conectar React con Django?</h3>
        <p>
          Porque React y Django corren en puertos diferentes. CORS permite que el
          frontend pueda pedir datos al backend sin que el navegador bloquee la petición.
        </p>
      </div>

      <div className="pregunta">
        <h3>6. ¿Qué es la paginación y por qué es útil?</h3>
        <p>
          La paginación divide los resultados en páginas pequeñas. Es útil porque evita
          cargar demasiados datos al mismo tiempo y hace la aplicación más rápida.
        </p>
      </div>

      <div className="pregunta">
        <h3>7. ¿Qué hace useEffect al consumir una API?</h3>
        <p>
          useEffect ejecuta la petición al backend cuando carga la pantalla o cuando
          cambian datos como el filtro o la búsqueda.
        </p>
      </div>

      <div className="pregunta">
        <h3>
          8. ¿Qué diferencia hay entre manejar datos locales con useState y consumir
          datos desde un backend?
        </h3>
        <p>
          Con useState los datos viven solo en React mientras la app está abierta.
          Con un backend, los datos vienen de una base de datos y pueden compartirse
          con más usuarios o aplicaciones.
        </p>
      </div>
    </section>
  );
}

export default TheorySection;
