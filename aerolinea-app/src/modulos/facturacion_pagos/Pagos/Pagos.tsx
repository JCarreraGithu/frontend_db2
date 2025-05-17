import React, { useEffect, useState } from "react";
import axios from "axios";
import './Pagos.css';

type Pago = {
  id_pago: number;
  id_factura: number;
  metodo_pago: string;
  monto_pagado: number;
  monto_equipaje: number;
  detalle_pago: string;
  fecha_pago: string;
};

const Pagos: React.FC = () => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [form, setForm] = useState({
    id_factura: "",
    metodo_pago: "",
    monto_pagado: "",
    monto_equipaje: "",
    detalle_pago: "",
  });

  const fetchPagos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/pagos");
      const data = res.data.map((row: any[]) => ({
        id_pago: row[0],
        id_factura: row[1],
        metodo_pago: row[2],
        monto_pagado: row[3],
        monto_equipaje: row[4],
        detalle_pago: row[5],
        fecha_pago: row[6],
      }));
      setPagos(data);
    } catch (error) {
      console.error("Error al obtener pagos:", error);
    }
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/pagos", {
        id_factura: Number(form.id_factura),
        metodo_pago: form.metodo_pago,
        monto_pagado: parseFloat(form.monto_pagado),
        monto_equipaje: parseFloat(form.monto_equipaje),
        detalle_pago: form.detalle_pago,
      });
      setForm({
        id_factura: "",
        metodo_pago: "",
        monto_pagado: "",
        monto_equipaje: "",
        detalle_pago: "",
      });
      fetchPagos();
    } catch (error) {
      console.error("Error al agregar pago:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/pagos/${id}`);
      fetchPagos();
    } catch (error) {
      console.error("Error al eliminar pago:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Pagos</h1>

      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-4">
        <input name="id_factura" value={form.id_factura} onChange={handleChange} placeholder="ID Factura" className="p-2 border rounded" required />
        <input name="metodo_pago" value={form.metodo_pago} onChange={handleChange} placeholder="Método de Pago" className="p-2 border rounded" required />
        <input name="monto_pagado" value={form.monto_pagado} onChange={handleChange} placeholder="Monto Pagado" type="number" step="0.01" className="p-2 border rounded" required />
        <input name="monto_equipaje" value={form.monto_equipaje} onChange={handleChange} placeholder="Monto Equipaje" type="number" step="0.01" className="p-2 border rounded" required />
        <textarea name="detalle_pago" value={form.detalle_pago} onChange={handleChange} placeholder="Detalle del Pago" className="p-2 border rounded col-span-2" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">Agregar Pago</button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Factura</th>
            <th className="border p-2">Método</th>
            <th className="border p-2">Monto</th>
            <th className="border p-2">Equipaje</th>
            <th className="border p-2">Detalle</th>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago.id_pago}>
              <td className="border p-2">{pago.id_pago}</td>
              <td className="border p-2">{pago.id_factura}</td>
              <td className="border p-2">{pago.metodo_pago}</td>
              <td className="border p-2">{pago.monto_pagado}</td>
              <td className="border p-2">{pago.monto_equipaje}</td>
              <td className="border p-2">{pago.detalle_pago}</td>
              <td className="border p-2">{new Date(pago.fecha_pago).toLocaleDateString()}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(pago.id_pago)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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

export default Pagos;
