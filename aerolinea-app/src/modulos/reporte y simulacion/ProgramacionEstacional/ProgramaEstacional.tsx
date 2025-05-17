import { useEffect, useState } from "react";
import "./Estilo.css"; // Asegúrate de tener este archivo de estilos

type Vuelo = {
  id_vuelo: number;
  aerolinea: string;
  origen: string;
  destino: string;
  frecuencia: string; // Diaria, Semanal, Mensual, etc.
  temporada: string; // Alta, Baja, Media, etc.
};

const GestionVuelos = () => {
  const [vuelos, setVuelos] = useState<Vuelo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const limpiarError = () => setTimeout(() => setError(null), 3000);

  const obtenerVuelos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/vuelos");
      if (!res.ok) throw new Error(`❌ Error HTTP: ${res.status}`);

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("❌ Respuesta inesperada de la API");

      const formateado = data.map((arr: any[]) => {
        if (arr.length < 6) throw new Error("❌ Formato incorrecto en los datos");
        return {
          id_vuelo: arr[0],
          aerolinea: arr[1],
          origen: arr[2],
          destino: arr[3],
          frecuencia: arr[4],
          temporada: arr[5],
        };
      });

      setVuelos(formateado);
    } catch (error) {
      setError(error instanceof Error ? error.message : "❌ Error al cargar vuelos");
      limpiarError();
    }
  };

  useEffect(() => {
    obtenerVuelos();
  }, []);

  return (
    <div className="vuelos-wrapper">
      <h1>✈️ Gestión de Vuelos según la Temporada</h1>

      {error && <p className="error">{error}</p>}

      <table className="vuelos-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Aerolínea</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Frecuencia</th>
            <th>Temporada</th>
          </tr>
        </thead>
        <tbody>
          {vuelos.map((vuelo) => (
            <tr key={vuelo.id_vuelo}>
              <td>{vuelo.id_vuelo}</td>
              <td>{vuelo.aerolinea}</td>
              <td>{vuelo.origen}</td>
              <td>{vuelo.destino}</td>
              <td>{vuelo.frecuencia}</td>
              <td>{vuelo.temporada}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionVuelos;