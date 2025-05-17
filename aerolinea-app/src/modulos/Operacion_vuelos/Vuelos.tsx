import { useEffect, useState } from "react";
import "./Vuelos.css";

type Vuelo = {
  id_vuelo: number;
  id_programa: number;
  fecha: string;
  plazas_disponibles: number;
  id_avion: number;
  estado: string;
};

const Vuelos = () => {
  const [vuelos, setVuelos] = useState<Vuelo[]>([]);
  const [nuevoVuelo, setNuevoVuelo] = useState({
    id_programa: 0,
    fecha: "",
    plazas_disponibles: 0,
    id_avion: 0,
    estado: "activo",
  });
  const [busquedaID, setBusquedaID] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const limpiarMensaje = () => setTimeout(() => setMensaje(null), 3000);
  const limpiarError = () => setTimeout(() => setError(null), 3000);

  const obtenerVuelos = () => {
    fetch("http://localhost:3000/api/vuelos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const formateado = data.map((arr: any[]) => ({
            id_vuelo: arr[0],
            id_programa: arr[1],
            fecha: arr[2],
            plazas_disponibles: arr[3],
            id_avion: arr[4],
            estado: arr[5],
          }));
          setVuelos(formateado);
        } else {
          setError("❌ Error: formato inesperado de la API");
          limpiarError();
        }
      })
      .catch(() => {
        setError("❌ Error al cargar vuelos");
        limpiarError();
      });
  };

  useEffect(() => {
    obtenerVuelos();
  }, []);

  const añadirVuelo = () => {
    const vueloData = {
      id_programa: Number(nuevoVuelo.id_programa),
      fecha: nuevoVuelo.fecha,
      plazas_disponibles: Number(nuevoVuelo.plazas_disponibles),
      id_avion: Number(nuevoVuelo.id_avion),
      estado: nuevoVuelo.estado,
    };

    console.log("Enviando datos:", vueloData);

    fetch("http://localhost:3000/api/vuelos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vueloData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("❌ Error al registrar vuelo");
        return res.json();
      })
      .then(() => {
        console.log("Vuelo registrado correctamente");
        setMensaje("✅ Vuelo registrado exitosamente");
        setNuevoVuelo({ id_programa: 0, fecha: "", plazas_disponibles: 0, id_avion: 0, estado: "activo" });
        obtenerVuelos();
        limpiarMensaje();
      })
      .catch((err) => {
        console.error("Error en la solicitud:", err);
        setError("❌ Error al registrar vuelo");
        limpiarError();
      });
  };

  const eliminarVuelo = (id: number) => {
    if (!confirm(`¿Eliminar vuelo con ID ${id}?`)) return;
    fetch(`http://localhost:3000/api/vuelos/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar vuelo");
        obtenerVuelos();
        setMensaje("🗑️ Vuelo eliminado");
        limpiarMensaje();
      })
      .catch(() => {
        setError("❌ Error al eliminar vuelo");
        limpiarError();
      });
  };

  const buscarPorID = () => {
    if (!busquedaID) {
      obtenerVuelos();
      return;
    }

    fetch(`http://localhost:3000/api/Vuelos/${busquedaID}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !Array.isArray(data)) {
          setError("❌ Vuelo no encontrado");
          limpiarError();
          return;
        }

        const vuelo = {
          id_vuelo: data[0],
          id_programa: data[1],
          fecha: data[2],
          plazas_disponibles: data[3],
          id_avion: data[4],
          estado: data[5],
        };

        setVuelos([vuelo]);
      })
      .catch(() => {
        setError("❌ Error al buscar vuelo");
        limpiarError();
      });
  };

  return (
    <div className="vuelos-wrapper">
      <h1>✈️ Gestión de Vuelos</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      {/* FORMULARIO */}
      <div className="vuelos-card">
        <h3>➕ Registrar Vuelo</h3>
        
        <label htmlFor="id_programa">ID Programa</label>
        <input id="id_programa" type="number" placeholder="Ejemplo: 61" value={nuevoVuelo.id_programa} onChange={(e) => setNuevoVuelo({ ...nuevoVuelo, id_programa: Number(e.target.value) })} />

        <label htmlFor="fecha">Fecha del vuelo</label>
        <input id="fecha" type="date" value={nuevoVuelo.fecha} onChange={(e) => setNuevoVuelo({ ...nuevoVuelo, fecha: e.target.value })} />

        <label htmlFor="plazas_disponibles">Plazas disponibles</label>
        <input id="plazas_disponibles" type="number" placeholder="Ejemplo: 150" value={nuevoVuelo.plazas_disponibles} onChange={(e) => setNuevoVuelo({ ...nuevoVuelo, plazas_disponibles: Number(e.target.value) })} />

        <label htmlFor="id_avion">ID del avión asignado</label>
        <input id="id_avion" type="number" placeholder="Ejemplo: 70" value={nuevoVuelo.id_avion} onChange={(e) => setNuevoVuelo({ ...nuevoVuelo, id_avion: Number(e.target.value) })} />

        <label htmlFor="estado">Estado del vuelo</label>
        <select id="estado" value={nuevoVuelo.estado} onChange={(e) => setNuevoVuelo({ ...nuevoVuelo, estado: e.target.value })}>
          <option value="activo">Activo</option>
          <option value="cancelado">Cancelado</option>
          <option value="finalizado">Finalizado</option>
        </select>

        <button onClick={añadirVuelo}>➕ Añadir</button>
      </div>

      {/* TABLA */}
      <table className="vuelos-tabla">
        <thead>
          <tr>
            <th>ID Vuelo</th>
            <th>ID Programa</th>
            <th>Fecha</th>
            <th>Plazas Disponibles</th>
            <th>ID Avión</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {vuelos.map((vuelo) => (
            <tr key={vuelo.id_vuelo}>
              <td>{vuelo.id_vuelo}</td>
              <td>{vuelo.id_programa}</td>
              <td>{vuelo.fecha}</td>
              <td>{vuelo.plazas_disponibles}</td>
              <td>{vuelo.id_avion}</td>
              <td>{vuelo.estado}</td>
              <td>
                <button className="btn-eliminar" onClick={() => eliminarVuelo(vuelo.id_vuelo)}>❌ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vuelos;