import { useEffect, useState } from "react";
import "./ProgramacionEstacional.css"; // Asegúrate de tener este archivo de estilos

const baseUrl = import.meta.env.VITE_API_URL;

type Vuelo = {
  id_vuelo: number;
  aerolinea: string;
  temporada: string;
  descripcion: string;
};

const GestionVuelos = () => {
  const [vuelos, setVuelos] = useState<Vuelo[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Limpiar error después de 3 segundos
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  const obtenerVuelos = async () => {
    try {
      const res = await fetch(`${baseUrl}/programacion-estacional`);
      if (!res.ok) {
        throw new Error(`❌ Error HTTP: ${res.status}`);
      }

      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error("❌ Respuesta inesperada de la API");
      }

      const formateado = data.map((arr: any[]) => {
        if (arr.length < 4) throw new Error("❌ Formato incorrecto en los datos");
        return {
          id_vuelo: arr[0],
          aerolinea: `Aerolínea ${arr[1]}`, // Si los valores son códigos, puedes mapearlos a nombres reales
          temporada: arr[2],
          descripcion: arr[3],
        };
      });

      setVuelos(formateado);
    } catch (error) {
      setError(error instanceof Error ? error.message : "❌ Error al cargar vuelos");
    }
  };

  useEffect(() => {
    obtenerVuelos();
  }, []);

  return (
    <div className="vuelos-wrapper">
      <h1>✈️ Gestión de Vuelos según la Temporada</h1>

      {error && <p className="error">{error}</p>}

      {vuelos.length === 0 && !error && <p>No hay vuelos programados.</p>}

      {vuelos.length > 0 && (
        <table className="vuelos-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Aerolínea</th>
              <th>Temporada</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {vuelos.map((vuelo) => (
              <tr key={vuelo.id_vuelo}>
                <td>{vuelo.id_vuelo}</td>
                <td>{vuelo.aerolinea}</td>
                <td>{vuelo.temporada}</td>
                <td>{vuelo.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GestionVuelos;
