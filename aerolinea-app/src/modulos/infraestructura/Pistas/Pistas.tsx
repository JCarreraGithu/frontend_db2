import React, { useEffect, useState } from "react";
import "./Estilo.css";

type Pista = {
  id: number;
  nombre: string;
  estado: string;
  longitud: number;
  capacidad: number;
};

const ListaPistas: React.FC = () => {
  const [pistas, setPistas] = useState<Pista[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/pistas")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener las pistas");
        return res.json();
      })
      .then((data: any[][]) => {
        const pistasFormateadas: Pista[] = data.map((item) => ({
          id: item[0],
          nombre: item[1],
          estado: item[2],
          longitud: item[3],
          capacidad: item[4],
        }));
        setPistas(pistasFormateadas);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  return (
    <div className="pagos-wrapper">
      <h1>Listado de Pistas</h1>

      {cargando && <p className="mensaje">Cargando pistas...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="pagos-card">
        <table className="pagos-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Longitud (m)</th>
              <th>Capacidad (aviones)</th>
            </tr>
          </thead>
          <tbody>
            {pistas.map((pista) => (
              <tr key={pista.id}>
                <td>{pista.id}</td>
                <td>{pista.nombre}</td>
                <td>{pista.estado}</td>
                <td>{pista.longitud}</td>
                <td>{pista.capacidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaPistas;
