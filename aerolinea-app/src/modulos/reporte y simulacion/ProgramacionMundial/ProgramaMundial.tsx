import { useEffect, useState } from "react";
import "./ProgramaMundial.css"; // Asegúrate de tener este archivo de estilos
const baseUrl = import.meta.env.VITE_API_URL;

type Vuelo = {
  id_vuelo: number;
  aerolínea: string;
  origen: string;
  destino: string;
  fecha_salida: string;
  estado: string; // Programado, En vuelo, Cancelado
};

const ProgramacionMundial = () => {
  const [vuelos, setVuelos] = useState<Vuelo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const limpiarError = () => setTimeout(() => setError(null), 3000);

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const obtenerVuelos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/vuelos`);
      if (!res.ok) throw new Error(`❌ Error HTTP: ${res.status}`);

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("❌ Respuesta inesperada de la API");

      const formateado = data.map((arr: any[]) => {
        if (arr.length < 6) throw new Error("❌ Formato incorrecto en los datos");
        return {
          id_vuelo: arr[0],
          aerolínea: arr[1],
          origen: arr[2],
          destino: arr[3],
          fecha_salida: arr[4],
          estado: arr[5],
        };
      });

      setVuelos(formateado);
    } catch (error) {
      setError(error instanceof Error ? error.message : "❌ Error al cargar vuelos");
      limpiarError();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerVuelos();
  }, []);

  return (
    <div className="vuelos-wrapper">
      <h1>🌍 Programación Mundial de Vuelos</h1>

      {loading && <p>Cargando vuelos...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && vuelos.length === 0 && !error && <p>No hay vuelos programados.</p>}

      {!loading && vuelos.length > 0 && (
        <table className="vuelos-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Aerolínea</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Fecha de Salida</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {vuelos.map((vuelo) => (
              <tr key={vuelo.id_vuelo}>
                <td>{vuelo.id_vuelo}</td>
                <td>{vuelo.aerolínea}</td>
                <td>{vuelo.origen}</td>
                <td>{vuelo.destino}</td>
                <td>{formatearFecha(vuelo.fecha_salida)}</td>
                <td>{vuelo.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProgramacionMundial;
