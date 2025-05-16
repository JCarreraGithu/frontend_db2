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
  const [nuevaPista, setNuevaPista] = useState({
    nombre: "",
    disponible: true,
    mantenimiento: "",
  });
  const [busquedaID, setBusquedaID] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const limpiarMensaje = () => setTimeout(() => setMensaje(null), 3000);
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

  const añadirPista = () => {
    fetch("http://localhost:3000/api/pistas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaPista),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al crear pista");
        return res.json();
      })
      .then(() => {
        setMensaje("✅ Pista registrada exitosamente");
        setNuevaPista({ nombre: "", disponible: true, mantenimiento: "" });
        obtenerPistas();
        limpiarMensaje();
      })
      .catch(() => {
        setError("❌ Error al registrar pista");
        limpiarError();
      });
  };

  const eliminarPista = (id: number) => {
    if (!confirm(`¿Eliminar pista con ID ${id}?`)) return;
    fetch(`http://localhost:3000/api/pistas/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar pista");
        obtenerPistas();
        setMensaje("🗑️ Pista eliminada");
        limpiarMensaje();
      })
      .catch(() => {
        setError("❌ Error al eliminar pista");
        limpiarError();
      });
  };

  return (
    <div className="pistas-wrapper">
      <h1>🛬 Gestión de Pistas de Aterrizaje y Despegue</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      <div className="pistas-card">
        <h3>➕ Registrar Pista</h3>
        <input
          type="text"
          placeholder="Nombre de la pista"
          value={nuevaPista.nombre}
          onChange={(e) =>
            setNuevaPista({ ...nuevaPista, nombre: e.target.value })
          }
        />
        <select
          value={nuevaPista.disponible ? "Sí" : "No"}
          onChange={(e) =>
            setNuevaPista({ ...nuevaPista, disponible: e.target.value === "Sí" })
          }
        >
          <option value="Sí">Disponible</option>
          <option value="No">No Disponible</option>
        </select>
        <input
          type="text"
          placeholder="Estado de mantenimiento"
          value={nuevaPista.mantenimiento}
          onChange={(e) =>
            setNuevaPista({ ...nuevaPista, mantenimiento: e.target.value })
          }
        />
        <button onClick={añadirPista}>➕ Añadir</button>
      </div>

      <table className="pistas-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Disponible</th>
            <th>Mantenimiento</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {pistas.map((pista) => (
            <tr key={pista.id_pista}>
              <td>{pista.id_pista}</td>
              <td>{pista.nombre}</td>
              <td>{pista.disponible ? "Sí" : "No"}</td>
              <td>{pista.mantenimiento}</td>
              <td>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarPista(pista.id_pista)}
                >
                  ❌ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pistas;