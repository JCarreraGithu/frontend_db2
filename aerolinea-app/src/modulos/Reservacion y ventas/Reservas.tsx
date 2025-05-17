import { useEffect, useState } from "react";
import "./Reservas.css";

type Reserva = {
  id_reserva: number;
  id_usuario: number;
  id_vuelo: number;
  asiento: string;
  estado_reserva: string;
  fecha_reserva: string;
  modalidad_venta: string;
  id_portal: number | null;
  id_visa: number | null;
  pasaporte: string | null;
  checkin_status: string;
  fecha_checkin: string | null;
};

const Reservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [nuevaReserva, setNuevaReserva] = useState({
    id_usuario: "",
    id_vuelo: "",
    asiento: "",
    modalidad_venta: "online",
    id_portal: null,
    id_visa: null,
    pasaporte: "",
    estado_reserva: "confirmada",
    fecha_reserva: new Date().toISOString().split("T")[0],
  });

  const [busquedaID, setBusquedaID] = useState("");
  const [mensaje, setMensaje] = useState<string | null>("⚠️ Una vez creada la reserva, no podrá ser modificada ni eliminada.");
  const [error, setError] = useState<string | null>(null);

  const limpiarMensaje = () => setTimeout(() => setMensaje(null), 4000);
  const limpiarError = () => setTimeout(() => setError(null), 4000);

  const obtenerReservas = () => {
    fetch("http://localhost:3000/api/reservas")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setError("❌ Error: formato inesperado de la API");
          limpiarError();
          return;
        }

        const formateado = data.map((arr: any) => ({
          id_reserva: arr[0],
          id_usuario: arr[1],
          id_vuelo: arr[2],
          asiento: arr[3],
          estado_reserva: arr[4],
          fecha_reserva: new Date(arr[5]).toLocaleDateString("es-ES"),
          modalidad_venta: arr[6],
          id_portal: arr[7],
          id_visa: arr[8],
          pasaporte: arr[9],
          checkin_status: arr[10],
          fecha_checkin: arr[11] ? new Date(arr[11]).toLocaleDateString("es-ES") : "No registrado",
        }));

        setReservas(formateado);
      })
      .catch(() => {
        setError("❌ Error al cargar reservas");
        limpiarError();
      });
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  const añadirReserva = () => {
    fetch("http://localhost:3000/api/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaReserva),
    })
      .then((res) => res.json())
      .then(() => {
        setMensaje("✅ Reserva creada exitosamente");
        setNuevaReserva({
          id_usuario: "",
          id_vuelo: "",
          asiento: "",
          modalidad_venta: "online",
          id_portal: null,
          id_visa: null,
          pasaporte: "",
          estado_reserva: "confirmada",
          fecha_reserva: new Date().toISOString().split("T")[0],
        });
        obtenerReservas();
        limpiarMensaje();
      })
      .catch(() => {
        setError("❌ Error al crear reserva");
        limpiarError();
      });
  };

  const buscarPorID = () => {
    if (!busquedaID) {
      obtenerReservas();
      return;
    }

    fetch(`http://localhost:3000/api/reservas/${busquedaID}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success || !data.data) {
          setError("❌ Reserva no encontrada");
          limpiarError();
          return;
        }

        setReservas([{
          id_reserva: data.data[0],
          id_usuario: data.data[1],
          id_vuelo: data.data[2],
          asiento: data.data[3],
          estado_reserva: data.data[4],
          fecha_reserva: new Date(data.data[5]).toLocaleDateString("es-ES"),
          modalidad_venta: data.data[6],
          id_portal: data.data[7],
          id_visa: data.data[8],
          pasaporte: data.data[9],
          checkin_status: data.data[10],
          fecha_checkin: data.data[11] ? new Date(data.data[11]).toLocaleDateString("es-ES") : "No registrado",
        }]);
      })
      .catch(() => {
        setError("❌ Error al buscar reserva");
        limpiarError();
      });
  };

  return (
    <div className="reservas-wrapper">
      <h1>✈️ Gestión de Reservas</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      {/* FORMULARIO */}
      <div className="reservas-card">
        <h3>➕ Crear Reserva</h3>
        <input type="number" placeholder="ID Usuario" value={nuevaReserva.id_usuario} onChange={(e) => setNuevaReserva({ ...nuevaReserva, id_usuario: e.target.value })} />
        <input type="number" placeholder="ID Vuelo" value={nuevaReserva.id_vuelo} onChange={(e) => setNuevaReserva({ ...nuevaReserva, id_vuelo: e.target.value })} />
        <input type="text" placeholder="Asiento (Ejemplo: 12A)" value={nuevaReserva.asiento} onChange={(e) => setNuevaReserva({ ...nuevaReserva, asiento: e.target.value })} />
        <button onClick={añadirReserva}>➕ Reservar</button>
      </div>

      {/* BÚSQUEDA */}
      <div className="reservas-card">
        <h3>🔍 Buscar Reserva por ID</h3>
        <input type="number" placeholder="ID Reserva" value={busquedaID} onChange={(e) => setBusquedaID(e.target.value)} />
        <button onClick={buscarPorID}>🔎 Buscar</button>
        <button onClick={obtenerReservas}>🔄 Ver Todas</button>
      </div>

      {/* TABLA */}
      <div className="reservas-card">
        <h3>📋 Lista de Reservas</h3>
        <table className="reservas-tabla">
          <thead>
            <tr>
              <th>ID Reserva</th>
              <th>ID Usuario</th>
              <th>ID Vuelo</th>
              <th>Asiento</th>
              <th>Estado</th>
              <th>Fecha Reserva</th>
              <th>Modalidad</th>
              <th>Check-in Status</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id_reserva}>
                <td>{reserva.id_reserva}</td>
                <td>{reserva.id_usuario}</td>
                <td>{reserva.id_vuelo}</td>
                <td>{reserva.asiento}</td>
                <td>{reserva.estado_reserva}</td>
                <td>{reserva.fecha_reserva}</td>
                <td>{reserva.modalidad_venta}</td>
                <td>{reserva.checkin_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservas;