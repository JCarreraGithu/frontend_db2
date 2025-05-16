import { useEffect, useState } from "react";
import "./Aerolineas.css"; // Crea o adapta este archivo de estilos si es necesario

type Aerolinea = {
  id_aerolinea: number;
  nombre: string;
  estado: string;
};

const Aerolineas = () => {
  const [aerolineas, setAerolineas] = useState<Aerolinea[]>([]);
  const [nuevaAerolinea, setNuevaAerolinea] = useState({
    nombre: "",
    estado: "activo",
  });
  const [busquedaID, setBusquedaID] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const limpiarMensaje = () => setTimeout(() => setMensaje(null), 3000);
  const limpiarError = () => setTimeout(() => setError(null), 3000);

  const obtenerAerolineas = () => {
    fetch("http://localhost:3000/api/aerolineas")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const formateado = data.map((arr: any[]) => ({
            id_aerolinea: arr[0],
            nombre: arr[1],
            estado: arr[2],
          }));
          setAerolineas(formateado);
        } else {
          setError("❌ Error: formato inesperado de la API");
          limpiarError();
        }
      })
      .catch(() => {
        setError("❌ Error al cargar aerolíneas");
        limpiarError();
      });
  };

  useEffect(() => {
    obtenerAerolineas();
  }, []);

  const añadirAerolinea = () => {
    fetch("http://localhost:3000/api/aerolineas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaAerolinea),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al crear aerolínea");
        return res.json();
      })
      .then(() => {
        setMensaje("✅ Aerolínea registrada exitosamente");
        setNuevaAerolinea({ nombre: "", estado: "activo" });
        obtenerAerolineas();
        limpiarMensaje();
      })
      .catch(() => {
        setError("❌ Error al registrar aerolínea");
        limpiarError();
      });
  };

  const eliminarAerolinea = (id: number) => {
    if (!confirm(`¿Eliminar aerolínea con ID ${id}?`)) return;
    fetch(`http://localhost:3000/api/aerolineas/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar aerolínea");
        obtenerAerolineas();
        setMensaje("🗑️ Aerolínea eliminada");
        limpiarMensaje();
      })
      .catch(() => {
        setError("❌ Error al eliminar aerolínea");
        limpiarError();
      });
  };

  const buscarPorID = () => {
    if (!busquedaID) {
      obtenerAerolineas();
      return;
    }

    fetch(`http://localhost:3000/api/aerolineas/${busquedaID}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !Array.isArray(data)) {
          setError("❌ Aerolínea no encontrada");
          limpiarError();
          return;
        }

        const aerolinea = {
          id_aerolinea: data[0],
          nombre: data[1],
          estado: data[2],
        };

        setAerolineas([aerolinea]);
      })
      .catch(() => {
        setError("❌ Error al buscar aerolínea");
        limpiarError();
      });
  };

  return (
    <div className="aerolineas-wrapper">
      <h1>🛫 Gestión de Aerolíneas</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      {/* FORMULARIO */}
      <div className="aerolineas-card">
        <h3>➕ Registrar Aerolínea</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevaAerolinea.nombre}
          onChange={(e) =>
            setNuevaAerolinea({ ...nuevaAerolinea, nombre: e.target.value })
          }
        />
        <select
          value={nuevaAerolinea.estado}
          onChange={(e) =>
            setNuevaAerolinea({ ...nuevaAerolinea, estado: e.target.value })
          }
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <button onClick={añadirAerolinea}>➕ Añadir</button>
      </div>

      {/* BUSCAR POR ID */}
      <div className="aerolineas-card">
        <h3>🔍 Buscar Aerolínea por ID</h3>
        <input
          type="text"
          placeholder="ID de Aerolínea"
          value={busquedaID}
          onChange={(e) => setBusquedaID(e.target.value)}
        />
        <button onClick={buscarPorID}>🔍 Buscar</button>
      </div>

      {/* TABLA */}
      <table className="aerolineas-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {aerolineas.map((aero) => (
            <tr key={aero.id_aerolinea}>
              <td>{aero.id_aerolinea}</td>
              <td>{aero.nombre}</td>
              <td>{aero.estado}</td>
              <td>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarAerolinea(aero.id_aerolinea)}
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

export default Aerolineas;
