import { useEffect, useState } from "react";
import axios from "axios";
import "./Reservas.css";

interface Reserva {
  id: number;
  id_usuario: number;
  id_vuelo: number;
  asiento: string;
  estado_reserva: string;
  fecha_reserva: string;
  id_pago: number;
  metodo_pago: string;
}

export default function Reservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [error, setError] = useState("");

  const fetchReservas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/reservas");
      const data = response.data.map((item: any[]) => ({
        id: item[0],
        id_usuario: item[1],
        id_vuelo: item[2],
        asiento: item[3],
        estado_reserva: item[4],
        fecha_reserva: item[5],
        id_pago: item[6],
        metodo_pago: item[7],
      }));
      setReservas(data);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
      setError("No se pudieron obtener las reservas.");
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  return (
    <div className="reservas-wrapper">
      <div className="reservas-card">
        <h1>Lista de Reservas</h1>

        <p className="aviso">
          ⚠️ Recuerda que una vez creada tu reserva, <strong>no podrás modificarla ni eliminarla</strong>. Asegúrate de elegir bien antes de confirmar.
        </p>

        {error && <p className="error">{error}</p>}

        {reservas.length === 0 && !error ? (
          <p className="sin-datos">No hay reservas registradas.</p>
        ) : (
          reservas.map((reserva) => (
            <div key={reserva.id} className="reserva-item">
              <p className="reserva-titulo">Reserva #{reserva.id}</p>
              <p>Vuelo: {reserva.id_vuelo}</p>
              <p>Usuario: {reserva.id_usuario}</p>
              <p>Asiento: {reserva.asiento}</p>
              <p>Estado: {reserva.estado_reserva}</p>
              <p>Fecha: {reserva.fecha_reserva}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
