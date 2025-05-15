import { useEffect, useState } from "react";
import axios from "axios";

export default function Equipaje() {
  const [equipajes, setEquipajes] = useState([]);
  const [idReserva, setIdReserva] = useState("");
  const [peso, setPeso] = useState("");
  const [dimensiones, setDimensiones] = useState("");
  const [estado, setEstado] = useState("En tránsito");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const fetchEquipajes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/equipajes");
      setEquipajes(response.data);
    } catch (err) {
      console.error("Error al obtener equipajes:", err);
      setError("No se pudieron obtener los equipajes.");
    }
  };

  const agregarEquipaje = async () => {
    if (!idReserva || !peso || !dimensiones) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/equipajes", {
        id_reserva: Number(idReserva),
        peso: Number(peso),
        dimensiones,
        estado,
      });
      setMensaje("Equipaje añadido correctamente.");
      setError("");
      setIdReserva("");
      setPeso("");
      setDimensiones("");
      setEstado("En tránsito");
      fetchEquipajes();
    } catch (err) {
      console.error("Error al agregar equipaje:", err);
      setError("No se pudo agregar el equipaje.");
    }
  };

  const eliminarEquipaje = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/equipajes/${id}`);
      setMensaje(`Equipaje #${id} eliminado.`);
      fetchEquipajes();
    } catch (err) {
      console.error("Error al eliminar equipaje:", err);
      setError("No se pudo eliminar el equipaje.");
    }
  };

  useEffect(() => {
    fetchEquipajes();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Equipajes</h1>

      <div className="bg-blue-100 text-blue-800 p-3 rounded mb-6 text-sm">
        Aquí puedes gestionar el equipaje registrado desde el check-in hasta el destino final. 
        Puedes agregar nuevos equipajes y eliminar los que ya no correspondan. 
        También es útil para seguimiento de objetos extraviados.
      </div>

      {mensaje && <p className="text-green-600 mb-4">{mensaje}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Formulario para agregar equipaje */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Añadir Equipaje</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="ID de Reserva"
            value={idReserva}
            onChange={(e) => setIdReserva(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Peso (kg)"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Dimensiones (ej. 55x40x20 cm)"
            value={dimensiones}
            onChange={(e) => setDimensiones(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="En tránsito">En tránsito</option>
            <option value="Entregado">Entregado</option>
            <option value="Extraviado">Extraviado</option>
          </select>
        </div>
        <button
          onClick={agregarEquipaje}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Agregar
        </button>
      </div>

      {/* Lista de equipajes */}
      <h2 className="text-lg font-semibold mb-2">Equipajes Registrados</h2>
      {equipajes.length === 0 ? (
        <p className="text-gray-600">No hay equipajes registrados.</p>
      ) : (
        equipajes.map((equipaje: any) => (
          <div
            key={equipaje.id}
            className="bg-white p-4 rounded shadow mb-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">Equipaje #{equipaje.id}</p>
              <p className="text-sm text-gray-600">
                Reserva: {equipaje.id_reserva} | Peso: {equipaje.peso}kg | Dimensiones: {equipaje.dimensiones} | Estado: {equipaje.estado}
              </p>
            </div>
            <button
              onClick={() => eliminarEquipaje(equipaje.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  );
}
