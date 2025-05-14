import { useEffect, useState } from "react";
import axios from "axios";

export default function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState("");

  const fetchReservas = async () => {
    try {
      const response = await axios.get("http://0.0.0.0:3000/api/reservas");
      setReservas(response.data);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
      setError("No se pudieron obtener las reservas.");
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const handleModificar = (id: number) => {
    console.log("Modificar reserva con ID:", id);
  };

  const handleCancelar = (id: number) => {
    console.log("Cancelar reserva con ID:", id);
  };

  const handleConfirmar = (id: number) => {
    console.log("Confirmar reserva con ID:", id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lista de Reservas</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {reservas.length === 0 && !error ? (
        <p className="text-gray-500">No hay reservas registradas.</p>
      ) : (
        reservas.map((reserva: any) => (
          <div
            key={reserva.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center mb-4"
          >
            <div>
              <p className="text-lg font-semibold">Reserva #{reserva.id}</p>
              <p className="text-sm text-gray-600">Vuelo: {reserva.id_vuelo}</p>
              <p className="text-sm text-gray-600">Usuario: {reserva.id_usuario}</p>
              <p className="text-sm text-gray-600">Estado: {reserva.estado_reserva}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleModificar(reserva.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Modificar
              </button>
              <button
                onClick={() => handleCancelar(reserva.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleConfirmar(reserva.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Confirmar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
