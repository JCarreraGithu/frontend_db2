import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface Reserva {
  id: number;
  id_usuario: number;
  id_vuelo: number;
  asiento: string;
  modalidad_venta: string;
  estado_reserva: string;
  fecha_reserva: string;
}

export default function Reservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [mostrarReservas, setMostrarReservas] = useState(false);

  const obtenerReservas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/reservas"); // Ajusta el puerto si es necesario
      setReservas(response.data);
      setMostrarReservas(true);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de Reservas</h1>

      <div className="flex gap-4 mb-6">
        <Button onClick={obtenerReservas}>Ver Reservas</Button>
        <Button variant="outline">Modificar Reserva</Button>
        <Button variant="destructive">Cancelar Reserva</Button>
        <Button variant="default">Confirmar Disponibilidad</Button>
      </div>

      {mostrarReservas && (
        <div className="border rounded-lg p-4 shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-2">Listado de Reservas</h2>
          {reservas.length === 0 ? (
            <p>No hay reservas registradas.</p>
          ) : (
            <ul className="divide-y">
              {reservas.map((reserva) => (
                <li key={reserva.id} className="py-2">
                  <p><strong>Usuario:</strong> {reserva.id_usuario}</p>
                  <p><strong>Vuelo:</strong> {reserva.id_vuelo}</p>
                  <p><strong>Asiento:</strong> {reserva.asiento}</p>
                  <p><strong>Modalidad:</strong> {reserva.modalidad_venta}</p>
                  <p><strong>Estado:</strong> {reserva.estado_reserva}</p>
                  <p><strong>Fecha:</strong> {new Date(reserva.fecha_reserva).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
