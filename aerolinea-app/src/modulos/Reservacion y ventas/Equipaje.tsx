import { useEffect, useState } from "react";
import "./Equipaje.css";
const baseUrl = import.meta.env.VITE_API_URL; // Asumimos que baseUrl ya tiene "/api"

type EquipajeItem = {
  id: number;
  id_reserva: number;
  peso: number;
  dimensiones: string;
  estado: string;
};

const Equipaje = () => {
  const [equipajes, setEquipajes] = useState<EquipajeItem[]>([]);
  const [nuevoEquipaje, setNuevoEquipaje] = useState({
    id_reserva: "",
    peso: "",
    dimensiones: "",
    estado: "",
  });
  const [busquedaID, setBusquedaID] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMensaje(null);
      setError(null);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [mensaje, error]);

  const obtenerEquipajes = () => {
    fetch(`${baseUrl}/equipajes`)  // Usamos baseUrl directamente
      .then((res) => res.json())
      .then((data) => {
        const formateados = data.data.map((item: any[]) => ({
          id: item[0],
          id_reserva: item[1],
          peso: item[2],
          dimensiones: item[3],
          estado: item[4],
        }));
        setEquipajes(formateados);
      })
      .catch(() => {
        setError("❌ Error al cargar equipajes");
      });
  };

  useEffect(() => {
    obtenerEquipajes();
  }, []);

  const añadirEquipaje = () => {
    if (
      !nuevoEquipaje.id_reserva ||
      !nuevoEquipaje.peso ||
      !nuevoEquipaje.dimensiones ||
      !nuevoEquipaje.estado
    ) {
      setError("❌ Todos los campos son obligatorios");
      return;
    }

    fetch(`${baseUrl}/equipajes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoEquipaje),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al crear equipaje");
        return res.json();
      })
      .then(() => {
        setMensaje("✅ Equipaje insertado exitosamente");
        setNuevoEquipaje({ id_reserva: "", peso: "", dimensiones: "", estado: "" });
        obtenerEquipajes();
      })
      .catch(() => {
        setError("❌ Error al insertar equipaje");
      });
  };

  const eliminarEquipaje = (id: number) => {
    if (!confirm(`¿Eliminar equipaje con ID ${id}?`)) return;
    fetch(`${baseUrl}/equipajes/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar");
        obtenerEquipajes();
        setMensaje("🗑️ Equipaje eliminado");
      })
      .catch(() => {
        setError("❌ Error al eliminar equipaje");
      });
  };

  const buscarPorID = () => {
    if (!busquedaID) {
      obtenerEquipajes();
      return;
    }

    fetch(`${baseUrl}/equipajes/${busquedaID}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success || !data.data || data.data.length === 0) {
          setError("❌ Equipaje no encontrado");
          return;
        }

        const item = Array.isArray(data.data[0]) ? data.data[0] : data.data;
        const equipaje = {
          id: item[0],
          id_reserva: item[1],
          peso: item[2],
          dimensiones: item[3],
          estado: item[4],
        };

        setEquipajes([equipaje]);
      })
      .catch(() => {
        setError("❌ Error al buscar equipaje");
      });
  };

  return (
    <div className="equipaje-wrapper">
      <h1>🎒 Gestión de Equipajes</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      {/* FORMULARIO */}
      <div className="equipaje-card">
        <h3>➕ Añadir Equipaje</h3>
        <input
          type="number"
          placeholder="ID Reserva"
          value={nuevoEquipaje.id_reserva}
          onChange={(e) =>
            setNuevoEquipaje({ ...nuevoEquipaje, id_reserva: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Peso (kg)"
          value={nuevoEquipaje.peso}
          onChange={(e) =>
            setNuevoEquipaje({ ...nuevoEquipaje, peso: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Dimensiones"
          value={nuevoEquipaje.dimensiones}
          onChange={(e) =>
            setNuevoEquipaje({ ...nuevoEquipaje, dimensiones: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Estado"
          value={nuevoEquipaje.estado}
          onChange={(e) =>
            setNuevoEquipaje({ ...nuevoEquipaje, estado: e.target.value })
          }
        />
        <button onClick={añadirEquipaje}>➕ Añadir</button>
      </div>

      {/* BÚSQUEDA */}
      <div className="equipaje-card">
        <h3>🔍 Buscar Equipaje por ID</h3>
        <input
          type="number"
          placeholder="ID"
          value={busquedaID}
          onChange={(e) => setBusquedaID(e.target.value)}
        />
        <button onClick={buscarPorID}>🔎 Buscar</button>
        <button onClick={obtenerEquipajes}>🔄 Ver Todos</button>
      </div>

      {/* TABLA */}
      <div className="equipaje-card">
        <h3>📋 Lista de Equipajes</h3>
        <table className="equipaje-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Reserva</th>
              <th>Peso</th>
              <th>Dimensiones</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {equipajes.map((eq) => (
              <tr key={eq.id}>
                <td>{eq.id}</td>
                <td>{eq.id_reserva}</td>
                <td>{eq.peso}</td>
                <td>{eq.dimensiones}</td>
                <td>{eq.estado}</td>
                <td>
                  <button onClick={() => eliminarEquipaje(eq.id)} style={{ backgroundColor: "#dc3545" }}>
                    ❌ Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {equipajes.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No hay equipajes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Equipaje;
