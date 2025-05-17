import { useEffect, useState } from "react";
import "./Estilo.css"; // Asegúrate de tener este archivo de estilos

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

  const limpiarError = () => setTimeout(() => setError(null), 3000);

  const obtenerVuelos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/vuelos");
      if (!res.ok) throw new Error(`❌ Error HTTP: ${res.status}`);

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("❌ Respuesta inesperada de la API");

      const formateado = data.map((arr: any[]) => {
        if (arr.length < 5) throw new Error("❌ Formato incorrecto en los datos");
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
    }
  };

  useEffect(() => {
    obtenerVuelos();
  }, []);

  return (
    <div className="vuelos-wrapper">
      <h1>🌍 Programación Mundial de Vuelos</h1>

      {error && <p className="error">{error}</p>}

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
              <td>{vuelo.fecha_salida}</td>
              <td>{vuelo.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramacionMundial;