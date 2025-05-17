import { useEffect, useState } from "react";
import "./Estilo.css"; // Crea o adapta este archivo de estilos si es necesario

type Pista = {
  id_pista: number;
  nombre: string;
  disponible: boolean;
  mantenimiento: string;
};

const Pistas = () => {
  const [pistas, setPistas] = useState<Pista[]>([]);
  const [error, setError] = useState<string | null>(null);

  const limpiarError = () => setTimeout(() => setError(null), 3000);

  const obtenerPistas = () => {
    fetch("http://localhost:3000/api/pistas")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const formateado = data.map((arr: any[]) => ({
            id_pista: arr[0],
            nombre: arr[1],
            disponible: arr[2] === "Sí",
            mantenimiento: arr[3],
          }));
          setPistas(formateado);
        } else {
          setError("❌ Error: formato inesperado de la API");
          limpiarError();
        }
      })
      .catch(() => {
        setError("❌ Error al cargar pistas");
        limpiarError();
      });
  };

  useEffect(() => {
    obtenerPistas();
  }, []);

  return (
    <div className="pistas-wrapper">
      <h1>🛬 Gestión de Pistas de Aterrizaje y Despegue</h1>

      {error && <p className="error">{error}</p>}

      <table className="pistas-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Disponible</th>
            <th>Mantenimiento</th>
          </tr>
        </thead>
        <tbody>
          {pistas.map((pista) => (
            <tr key={pista.id_pista}>
              <td>{pista.id_pista}</td>
              <td>{pista.nombre}</td>
              <td>{pista.disponible ? "Sí" : "No"}</td>
              <td>{pista.mantenimiento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pistas;
