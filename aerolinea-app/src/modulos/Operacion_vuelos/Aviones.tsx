import { useEffect, useState } from "react";
import "./Aviones.css";
const baseUrl = import.meta.env.VITE_API_URL;

type Avion = {
  id_avion: number;
  modelo: string;
  capacidad: number;
  estado_mantenimiento: string;
  id_aerolinea: number;
};

const Aviones = () => {
  const [aviones, setAviones] = useState<Avion[]>([]);
  const [nuevoAvion, setNuevoAvion] = useState({
    modelo: "",
    capacidad: 0,
    estado_mantenimiento: "En servicio",
    id_aerolinea: 0,
  });
  const [busquedaID, setBusquedaID] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const limpiarMensaje = () => setTimeout(() => setMensaje(null), 3000);
  const limpiarError = () => setTimeout(() => setError(null), 3000);

  const obtenerAviones = () => {
    fetch(`${baseUrl}/aviones/All`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const formateado = data.map((arr: any[]) => ({
            id_avion: arr[0],
            modelo: arr[1],
            capacidad: arr[2],
            estado_mantenimiento: arr[3],
            id_aerolinea: arr[4],
          }));
          setAviones(formateado);
        } else {
          setError("❌ Error: formato inesperado de la API");
          limpiarError();
        }
      })
      .catch(() => {
        setError("❌ Error al cargar aviones");
        limpiarError();
      });
  };

  useEffect(() => {
    obtenerAviones();
  }, []);

  const añadirAvion = () => {
    fetch(`${baseUrl}/aviones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoAvion),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al registrar avión");
        return res.json();
      })
      .then(() => {
        setMensaje("✅ Avión registrado exitosamente");
        setNuevoAvion({
          modelo: "",
          capacidad: 0,
          estado_mantenimiento: "En servicio",
          id_aerolinea: 0,
        });
        obtenerAviones();
        limpiarMensaje();
      })
      .catch(() => {
        setError("❌ Error al registrar avión");
        limpiarError();
      });
  };

  const eliminarAvion = (id: number) => {
    if (!confirm(`¿Eliminar avión con ID ${id}?`)) return;
    fetch(`${baseUrl}/aviones/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar avión");
        obtenerAviones();
        setMensaje("🗑️ Avión eliminado");
        limpiarMensaje();
      })
      .catch(() => {
        setError("❌ Error al eliminar avión");
        limpiarError();
      });
  };

  const buscarPorID = () => {
    if (!busquedaID) {
      obtenerAviones();
      return;
    }

    fetch(`${baseUrl}/aviones/${busquedaID}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !Array.isArray(data)) {
          setError("❌ Avión no encontrado");
          limpiarError();
          return;
        }

        const avion = {
          id_avion: data[0],
          modelo: data[1],
          capacidad: data[2],
          estado_mantenimiento: data[3],
          id_aerolinea: data[4],
        };

        setAviones([avion]);
      })
      .catch(() => {
        setError("❌ Error al buscar avión");
        limpiarError();
      });
  };

  return (
    <div className="aviones-wrapper">
      <h1>🛫 Gestión de Aviones</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      {/* FORMULARIO */}
      <div className="aviones-card">
        <h3>➕ Registrar Avión</h3>
        <input
          type="text"
          placeholder="Modelo"
          value={nuevoAvion.modelo}
          onChange={(e) =>
            setNuevoAvion({ ...nuevoAvion, modelo: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Capacidad"
          value={nuevoAvion.capacidad}
          onChange={(e) =>
            setNuevoAvion({ ...nuevoAvion, capacidad: Number(e.target.value) })
          }
        />
        <select
          value={nuevoAvion.estado_mantenimiento}
          onChange={(e) =>
            setNuevoAvion({
              ...nuevoAvion,
              estado_mantenimiento: e.target.value,
            })
          }
        >
          <option value="En servicio">En servicio</option>
          <option value="Mantenimiento">Mantenimiento</option>
        </select>
        <input
          type="number"
          placeholder="ID Aerolínea"
          value={nuevoAvion.id_aerolinea}
          onChange={(e) =>
            setNuevoAvion({
              ...nuevoAvion,
              id_aerolinea: Number(e.target.value),
            })
          }
        />
        <button onClick={añadirAvion}>➕ Añadir</button>
      </div>

      {/* BUSCAR POR ID */}
      <div className="aviones-card">
        <h3>🔍 Buscar Avión por ID</h3>
        <input
          type="text"
          placeholder="ID de Avión"
          value={busquedaID}
          onChange={(e) => setBusquedaID(e.target.value)}
        />
        <button onClick={buscarPorID}>🔍 Buscar</button>
      </div>

      {/* TABLA */}
      <table className="aviones-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Capacidad</th>
            <th>Estado</th>
            <th>ID Aerolínea</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {aviones.map((avion) => (
            <tr key={avion.id_avion}>
              <td>{avion.id_avion}</td>
              <td>{avion.modelo}</td>
              <td>{avion.capacidad}</td>
              <td>{avion.estado_mantenimiento}</td>
              <td>{avion.id_aerolinea}</td>
              <td>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarAvion(avion.id_avion)}
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

export default Aviones;
