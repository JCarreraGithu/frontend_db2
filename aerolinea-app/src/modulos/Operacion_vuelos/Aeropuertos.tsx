import { useEffect, useState } from "react";
import "./Aeropuertos.css";
const baseUrl = import.meta.env.VITE_API_URL;

type Aeropuerto = {
  id_aeropuerto: number;
  codigo: string;
  nombre: string;
  ciudad: string;
  pais: string;
};

const Aeropuertos = () => {
  const [aeropuertos, setAeropuertos] = useState<Aeropuerto[]>([]);
  const [nuevoAeropuerto, setNuevoAeropuerto] = useState({
    codigo: "",
    nombre: "",
    ciudad: "",
    pais: "",
  });
  const [busquedaID, setBusquedaID] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const limpiarMensaje = () => setTimeout(() => setMensaje(null), 3000);
  const limpiarError = () => setTimeout(() => setError(null), 3000);

  const obtenerAeropuertos = () => {
    fetch(`${baseUrl}/aeropuertos/All`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const formateado = data.map((arr: any[]) => ({
            id_aeropuerto: arr[0],
            codigo: arr[1],
            nombre: arr[2],
            ciudad: arr[3],
            pais: arr[4],
          }));
          setAeropuertos(formateado);
        } else {
          setError("❌ Error: formato inesperado de la API");
          limpiarError();
        }
      })
      .catch(() => {
        setError("❌ Error al cargar aeropuertos");
        limpiarError();
      });
  };

  useEffect(() => {
    obtenerAeropuertos();
  }, []);

  const añadirAeropuerto = () => {
    fetch(`${baseUrl}/aeropuertos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoAeropuerto),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al crear aeropuerto");
        return res.json();
      })
      .then(() => {
        setMensaje("✅ Aeropuerto registrado exitosamente");
        setNuevoAeropuerto({ codigo: "", nombre: "", ciudad: "", pais: "" });
        obtenerAeropuertos();
        limpiarMensaje();
      })
      .catch(() => {
        setError("❌ Error al registrar aeropuerto");
        limpiarError();
      });
  };

  const eliminarAeropuerto = (id: number) => {
    if (!confirm(`¿Eliminar aeropuerto con ID ${id}?`)) return;
    fetch(`${baseUrl}/aeropuertos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar aeropuerto");
        obtenerAeropuertos();
        setMensaje("🗑️ Aeropuerto eliminado");
        limpiarMensaje();
      })
      .catch(() => {
        setError("❌ Error al eliminar aeropuerto");
        limpiarError();
      });
  };

  const buscarPorID = () => {
    if (!busquedaID) {
      obtenerAeropuertos();
      return;
    }

    fetch(`${baseUrl}/aeropuertos/${busquedaID}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !Array.isArray(data)) {
          setError("❌ Aeropuerto no encontrado");
          limpiarError();
          return;
        }

        const aeropuerto = {
          id_aeropuerto: data[0],
          codigo: data[1],
          nombre: data[2],
          ciudad: data[3],
          pais: data[4],
        };

        setAeropuertos([aeropuerto]);
      })
      .catch(() => {
        setError("❌ Error al buscar aeropuerto");
        limpiarError();
      });
  };

  return (
    <div className="aeropuertos-wrapper">
      <h1>✈️ Gestión de Aeropuertos</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      {/* FORMULARIO */}
      <div className="aeropuertos-card">
        <h3>➕ Registrar Aeropuerto</h3>
        <input
          type="text"
          placeholder="Código"
          value={nuevoAeropuerto.codigo}
          onChange={(e) =>
            setNuevoAeropuerto({ ...nuevoAeropuerto, codigo: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoAeropuerto.nombre}
          onChange={(e) =>
            setNuevoAeropuerto({ ...nuevoAeropuerto, nombre: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={nuevoAeropuerto.ciudad}
          onChange={(e) =>
            setNuevoAeropuerto({ ...nuevoAeropuerto, ciudad: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="País"
          value={nuevoAeropuerto.pais}
          onChange={(e) =>
            setNuevoAeropuerto({ ...nuevoAeropuerto, pais: e.target.value })
          }
        />
        <button onClick={añadirAeropuerto}>➕ Añadir</button>
      </div>

      {/* BUSCAR POR ID */}
      <div className="aeropuertos-card">
        <h3>🔍 Buscar Aeropuerto por ID</h3>
        <input
          type="text"
          placeholder="ID de Aeropuerto"
          value={busquedaID}
          onChange={(e) => setBusquedaID(e.target.value)}
        />
        <button onClick={buscarPorID}>🔍 Buscar</button>
      </div>

      {/* TABLA */}
      <table className="aeropuertos-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>País</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {aeropuertos.map((aero) => (
            <tr key={aero.id_aeropuerto}>
              <td>{aero.id_aeropuerto}</td>
              <td>{aero.codigo}</td>
              <td>{aero.nombre}</td>
              <td>{aero.ciudad}</td>
              <td>{aero.pais}</td>
              <td>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarAeropuerto(aero.id_aeropuerto)}
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

export default Aeropuertos;
