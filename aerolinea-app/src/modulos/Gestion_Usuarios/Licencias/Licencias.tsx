import { useEffect, useState } from "react";
import "./Licencias.css";

type Licencia = {
  id_licencia: number;
  id_cuenta: number;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  pagada: string;
  monto: number;
};

const Licencias = () => {
  const [licencias, setLicencias] = useState<Licencia[]>([]);
  const [busquedaID, setBusquedaID] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const limpiarMensaje = () => setTimeout(() => setMensaje(null), 3000);
  const limpiarError = () => setTimeout(() => setError(null), 3000);

  const obtenerLicencias = () => {
    fetch("http://localhost:3000/api/licencias")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setError("❌ Error: formato inesperado de la API");
          limpiarError();
          return;
        }

        const formateado = data.map((arr: any) => ({
          id_licencia: arr[0],
          id_cuenta: arr[1],
          descripcion: arr[2],
          fecha_inicio: new Date(arr[3]).toLocaleDateString("es-ES"),
          fecha_fin: new Date(arr[4]).toLocaleDateString("es-ES"),
          pagada: arr[5] === "Y" ? "Pagada" : "No Pagada",
          monto: arr[6],
        }));

        setLicencias(formateado);
      })
      .catch(() => {
        setError("❌ Error al cargar licencias");
        limpiarError();
      });
  };

  useEffect(() => {
    obtenerLicencias();
  }, []);

  const buscarPorID = () => {
    if (!busquedaID) {
      obtenerLicencias();
      return;
    }

    fetch(`http://localhost:3000/api/licencias/${busquedaID}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success || !data.data) {
          setError("❌ Licencia no encontrada");
          limpiarError();
          return;
        }

        setLicencias([{
          id_licencia: data.data[0],
          id_cuenta: data.data[1],
          descripcion: data.data[2],
          fecha_inicio: new Date(data.data[3]).toLocaleDateString("es-ES"),
          fecha_fin: new Date(data.data[4]).toLocaleDateString("es-ES"),
          pagada: data.data[5] === "Y" ? "Pagada" : "No Pagada",
          monto: data.data[6],
        }]);
      })
      .catch(() => {
        setError("❌ Error al buscar licencia");
        limpiarError();
      });
  };

  return (
    <div className="licencias-wrapper">
      <h1>📜 Gestión de Licencias</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      {/* BÚSQUEDA */}
      <div className="licencias-card">
        <h3>🔍 Buscar Licencia por ID</h3>
        <input
          type="number"
          placeholder="ID Licencia"
          value={busquedaID}
          onChange={(e) => setBusquedaID(e.target.value)}
        />
        <button onClick={buscarPorID}>🔎 Buscar</button>
        <button onClick={obtenerLicencias}>🔄 Ver Todas</button>
      </div>

      {/* TABLA DE LICENCIAS */}
      <div className="licencias-card">
        <h3>📋 Lista de Licencias</h3>
        <table className="licencias-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Cuenta</th>
              <th>Descripción</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Pagada</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {licencias.map((licencia) => (
              <tr key={licencia.id_licencia}>
                <td>{licencia.id_licencia}</td>
                <td>{licencia.id_cuenta}</td>
                <td>{licencia.descripcion}</td>
                <td>{licencia.fecha_inicio}</td>
                <td>{licencia.fecha_fin}</td>
                <td>{licencia.pagada}</td>
                <td>{licencia.monto}</td>
              </tr>
            ))}
            {licencias.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>No hay licencias registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Licencias;