


import React, { useEffect, useState } from "react";
import axios from "axios";
import './Facturacion.css'; // Asegúrate que este CSS esté en el mismo directorio

interface Factura {
  id_factura: number;
  id_reserva: number;
  monto: number;
  fecha: string;
}

const Facturacion: React.FC = () => {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [idReserva, setIdReserva] = useState<number>(0);
  const [monto, setMonto] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const obtenerFacturas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/facturacion");

      const datosAdaptados: Factura[] = response.data.map((arr: any[]) => ({
        id_factura: arr[0],
        id_reserva: arr[1],
        monto: arr[2],
        fecha: arr[3],
      }));

      setFacturas(datosAdaptados);
    } catch (err) {
      setError("Error al obtener las facturas.");
    }
  };

  const agregarFactura = async () => {
    if (idReserva <= 0 || monto <= 0) {
      setError("Por favor ingresa un ID de reserva y un monto válidos.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/facturacion", {
        id_reserva: idReserva,
        monto: monto,
      });

      setIdReserva(0);
      setMonto(0);
      setError("");
      obtenerFacturas();
    } catch (err) {
      setError("Error al agregar la factura.");
    }
  };

  const eliminarFactura = async (id: number) => {
    try {
      await axios.delete('http://localhost:3000/api/facturacion/${id}');
      obtenerFacturas();
    } catch (err) {
      setError("Error al eliminar la factura.");
    }
  };

  useEffect(() => {
    obtenerFacturas();
  }, []);

  return (
  <div className="facturacion-wrapper">
    <h2>Facturación</h2>
    <p className="mb-4 text-gray-700 text-center max-w-3xl">
      Emisión y gestión de facturas para pasajeros, aerolíneas y servicios especiales. Incluye validación fiscal y reportes.
    </p>

    {error && <p className="error">{error}</p>}

    <div className="facturacion-card">
      <input
        type="number"
        placeholder="ID Reserva"
        value={idReserva}
        onChange={(e) => setIdReserva(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(Number(e.target.value))}
      />
      <button onClick={agregarFactura}>Agregar Factura</button>
    </div>

    <table className="facturacion-tabla">
      <thead>
        <tr>
          <th>ID Factura</th>
          <th>ID Reserva</th>
          <th>Monto</th>
          <th>Fecha</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {facturas.map((factura) => (
          <tr key={factura.id_factura}>
            <td>{factura.id_factura}</td>
            <td>{factura.id_reserva}</td>
            <td>Q. {factura.monto.toFixed(2)}</td>
            <td>{new Date(factura.fecha).toLocaleString()}</td>
            <td>
              <button
                onClick={() => eliminarFactura(factura.id_factura)}
                style={{ backgroundColor: '#dc3545' }}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default Facturacion;