import { useEffect, useState } from "react";
import "./Estilo.css"; // Asegúrate de tener este archivo de estilos

type Escenario = {
  id_escenario: number;
  nombre: string;
  capacidad: number;
  estado: string;
};

const FlujoPasajeros = () => {
  const [escenarios, setEscenarios] = useState<Escenario[]>([]);
  const [error, setError] = useState<string | null>(null);

  const limpiarError = () => setTimeout(() => setError(null), 3000);

  const obtenerEscenarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/escenarios");
      const data = await res.json();

      if (Array.isArray(data)) {
        const formateado = data.map((arr: any[]) => ({
          id_escenario: arr[0],
          nombre: arr[1],
          capacidad: arr[2],
          estado: arr[3],
        }));
        setEscenarios(formateado);
      } else {
        throw new Error("❌ Error: formato inesperado de la API");
      }
    } catch (error) {
        setError(error instanceof Error ? error.message : "❌ Error al cargar escenarios");
      limpiarError();
    }
  };

  useEffect(() => {
    obtenerEscenarios();
  }, []);

  return (
    <div className="escenarios-wrapper">
      <h1>🚶‍♂️ Gestión del Flujo de Pasajeros</h1>

      {error && <p className="error">{error}</p>}

      <table className="escenarios-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Capacidad</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {escenarios.map((escenario) => (
            <tr key={escenario.id_escenario}>
              <td>{escenario.id_escenario}</td>
              <td>{escenario.nombre}</td>
              <td>{escenario.capacidad}</td>
              <td>{escenario.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlujoPasajeros;