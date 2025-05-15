import { useEffect, useState } from "react";
import axios from "axios";

export default function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState("");

  const fetchReservas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/reservas");

      // Transformar array de arrays a array de objetos
      const data = response.data.map((item: any[]) => ({
        id: item[0],
        id_usuario: item[1],
        id_vuelo: item[2],
        asiento: item[3],
        estado_reserva: item[4],
        fecha_reserva: item[5],
        id_pago: item[6],
        metodo_pago: item[7],
        // puedes agregar los campos que necesites aquí
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Reservas</h1>

      <p className="text-sm text-blue-700 bg-blue-100 p-3 rounded mb-6">
        ⚠️ Recuerda que una vez creada tu reserva, <strong>no podrás modificarla ni eliminarla</strong>. Asegúrate de elegir bien antes de confirmar.
      </p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {reservas.length === 0 && !error ? (
        <p className="text-gray-500">No hay reservas registradas.</p>
      ) : (
        reservas.map((reserva: any) => (
          <div
            key={reserva.id}
            className="bg-white p-4 rounded-lg shadow mb-4"
          >
            <p className="text-lg font-semibold">Reserva #{reserva.id}</p>
            <p className="text-sm text-gray-600">Vuelo: {reserva.id_vuelo}</p>
            <p className="text-sm text-gray-600">Usuario: {reserva.id_usuario}</p>
            <p className="text-sm text-gray-600">Asiento: {reserva.asiento}</p>
            <p className="text-sm text-gray-600">Estado: {reserva.estado_reserva}</p>
            <p className="text-sm text-gray-600">Fecha: {reserva.fecha_reserva}</p>
          </div>
        ))
      )}
    </div>
  );
}
