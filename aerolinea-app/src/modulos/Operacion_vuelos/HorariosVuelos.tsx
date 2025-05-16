import { useEffect, useState } from "react";
import "./HorariosVuelos.css";

type HorarioVuelo = {
  id_horario: number;
  id_vuelo: number;
  hora_salida: string;
  hora_llegada: string;
  estado: string;
};

const HorariosVuelos = () => {
  const [horarios, setHorarios] = useState<HorarioVuelo[]>([]);
  const [nuevoHorario, setNuevoHorario] = useState({
    id_vuelo: 0,
    hora_salida: "",
    hora_llegada: "",
    estado: "Programado",
  });
  const [busquedaID, setBusquedaID] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const limpiarMensaje = () => setTimeout(() => setMensaje(null), 3000);
  const limpiarError = () => setTimeout(() => setError(null), 3000);

  const obtenerHorarios = () => {
    fetch("http://localhost:3000/api/horarios-vuelos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const formateado = data.map((arr: any[]) => ({
            id_horario: arr[0],
            id_vuelo: arr[1],
            hora_salida: arr[2],
            hora_llegada: arr[3],
            estado: arr[4],
          }));
          setHorarios(formateado);
        } else {
          setError("❌ Error: formato inesperado de la API");
          limpiarError();
        }
      })
      .catch(() => {
        setError("❌ Error al cargar horarios de vuelo");
        limpiarError();
      });
  };

  useEffect(() => {
    obtenerHorarios();
  }, []);

  const añadirHorario = () => {
    const horarioData = {
      id_vuelo: Number(nuevoHorario.id_vuelo),
      hora_salida: nuevoHorario.hora_salida,
      hora_llegada: nuevoHorario.hora_llegada,
      estado: nuevoHorario.estado,
    };

    console.log("Enviando datos:", horarioData);

    fetch("http://localhost:3000/api/horarios-vuelos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(horarioData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("❌ Error al registrar horario");
        return res.json();
      })
      .then(() => {
        console.log("Horario registrado correctamente");
        setMensaje("✅ Horario registrado exitosamente");
        setNuevoHorario({ id_vuelo: 0, hora_salida: "", hora_llegada: "", estado: "Programado" });
        obtenerHorarios();
        limpiarMensaje();
      })
      .catch((err) => {
        console.error("Error en la solicitud:", err);
        setError("❌ Error al registrar horario");
        limpiarError();
      });
  };

  const eliminarHorario = (id: number) => {
    if (!confirm(`¿Eliminar horario con ID ${id}?`)) return;
    fetch(`http://localhost:3000/api/horarios-vuelos/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar horario");
        obtenerHorarios();
        setMensaje("🗑️ Horario eliminado");
        limpiarMensaje();
      })
      .catch(() => {
        setError("❌ Error al eliminar horario");
        limpiarError();
      });
  };

  const buscarPorID = () => {
    if (!busquedaID) {
      obtenerHorarios();
      return;
    }

    fetch(`http://localhost:3000/api/horarios-vuelos/${busquedaID}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !Array.isArray(data)) {
          setError("❌ Horario no encontrado");
          limpiarError();
          return;
        }

        const horario = {
          id_horario: data[0],
          id_vuelo: data[1],
          hora_salida: data[2],
          hora_llegada: data[3],
          estado: data[4],
        };

        setHorarios([horario]);
      })
      .catch(() => {
        setError("❌ Error al buscar horario");
        limpiarError();
      });
  };

  return (
    <div className="horarios-wrapper">
      <h1>🕒 Gestión de Horarios de Vuelo</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      {/* FORMULARIO */}
      <div className="horarios-card">
        <h3>➕ Registrar Horario</h3>
        
        <label htmlFor="id_vuelo">ID Vuelo</label>
        <input id="id_vuelo" type="number" placeholder="Ejemplo: 33" value={nuevoHorario.id_vuelo} onChange={(e) => setNuevoHorario({ ...nuevoHorario, id_vuelo: Number(e.target.value) })} />

        <label htmlFor="hora_salida">Hora de salida</label>
        <input id="hora_salida" type="datetime-local" value={nuevoHorario.hora_salida} onChange={(e) => setNuevoHorario({ ...nuevoHorario, hora_salida: e.target.value })} />

        <label htmlFor="hora_llegada">Hora de llegada</label>
        <input id="hora_llegada" type="datetime-local" value={nuevoHorario.hora_llegada} onChange={(e) => setNuevoHorario({ ...nuevoHorario, hora_llegada: e.target.value })} />

        <label htmlFor="estado">Estado del horario</label>
        <select id="estado" value={nuevoHorario.estado} onChange={(e) => setNuevoHorario({ ...nuevoHorario, estado: e.target.value })}>
          <option value="Programado">Programado</option>
          <option value="Retrasado">Retrasado</option>
          <option value="Cancelado">Cancelado</option>
        </select>

        <button onClick={añadirHorario}>➕ Añadir</button>
      </div>

      {/* TABLA */}
      <table className="horarios-tabla">
        <thead>
          <tr>
            <th>ID Horario</th>
            <th>ID Vuelo</th>
            <th>Hora Salida</th>
            <th>Hora Llegada</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario.id_horario}>
              <td>{horario.id_horario}</td>
              <td>{horario.id_vuelo}</td>
              <td>{horario.hora_salida}</td>
              <td>{horario.hora_llegada}</td>
              <td>{horario.estado}</td>
              <td>
                <button className="btn-eliminar" onClick={() => eliminarHorario(horario.id_horario)}>❌ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HorariosVuelos;