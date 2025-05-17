import { useEffect, useState } from "react";
import "./Estilo.css"; // Asegúrate de tener este archivo de estilos

type Reporte = {
  id_reporte: number;
  modulo: string; // Módulo del sistema que generó el reporte
  descripcion: string;
  fecha_generacion: string;
  estado: string; // Activo, Archivado, Pendiente
};

const GestionReportes = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [error, setError] = useState<string | null>(null);

  const limpiarError = () => setTimeout(() => setError(null), 3000);

  const obtenerReportes = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/reportes");
      if (!res.ok) throw new Error(`❌ Error HTTP: ${res.status}`);

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("❌ Respuesta inesperada de la API");

      const formateado = data.map((arr: any[]) => {
        if (arr.length < 5) throw new Error("❌ Formato incorrecto en los datos");
        return {
          id_reporte: arr[0],
          modulo: arr[1],
          descripcion: arr[2],
          fecha_generacion: arr[3],
          estado: arr[4],
        };
      });

      setReportes(formateado);
    } catch (error) {
      setError(error instanceof Error ? error.message : "❌ Error al cargar reportes");
      limpiarError();
    }
  };

  useEffect(() => {
    obtenerReportes();
  }, []);

  return (
    <div className="reportes-wrapper">
      <h1>📊 Administración de Reportes</h1>

      {error && <p className="error">{error}</p>}

      <table className="reportes-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Módulo</th>
            <th>Descripción</th>
            <th>Fecha de Generación</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map((reporte) => (
            <tr key={reporte.id_reporte}>
              <td>{reporte.id_reporte}</td>
              <td>{reporte.modulo}</td>
              <td>{reporte.descripcion}</td>
              <td>{reporte.fecha_generacion}</td>
              <td>{reporte.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionReportes;