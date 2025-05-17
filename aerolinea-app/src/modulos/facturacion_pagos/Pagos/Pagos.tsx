


import  { useEffect, useState } from "react";
import axios from "axios";
import "./Pagos.css"; // Asegúrate que el CSS esté bien enlazado

const Pagos = () => {
  const [idFactura, setIdFactura] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [montoPagado, setMontoPagado] = useState("");
  const [montoEquipaje, setMontoEquipaje] = useState("");
  const [detallePago, setDetallePago] = useState("");
  const [pagos, setPagos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [idBuscar, setIdBuscar] = useState("");
  const [pagoEncontrado, setPagoEncontrado] = useState(null);

  const obtenerPagos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/pagos");
      setPagos(res.data);
    } catch (err) {
      setError("Error al obtener los pagos.");
    }
  };

  const agregarPago = async () => {
    try {
      const nuevoPago = {
        id_factura: parseInt(idFactura),
        metodo_pago: metodoPago,
        monto_pagado: parseFloat(montoPagado),
        monto_equipaje: parseFloat(montoEquipaje),
        detalle_pago: detallePago,
      };

      await axios.post("http://localhost:3000/api/pagos", nuevoPago);
      setMensaje("Pago agregado correctamente.");
      setError("");
      limpiarCampos();
      obtenerPagos();
    } catch (err) {
      setMensaje("");
      setError("Error al agregar el pago.");
    }
  };

  const eliminarPago = async (id) => {
    try {
      await axios.delete("http://localhost:3000/api/pagos/${id}");
      setMensaje("Pago eliminado correctamente.");
      setError("");
      obtenerPagos();
    } catch (err) {
      setMensaje("");
      setError("Error al eliminar el pago.");
    }
  };

  const buscarPagoPorId = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/pagos/${idBuscar}");
      setPagoEncontrado(res.data);
      setMensaje("");
      setError("");
    } catch (err) {
      setPagoEncontrado(null);
      setMensaje("");
      setError("No se encontró el pago con ese ID");
    }
  };

  const limpiarCampos = () => {
    setIdFactura("");
    setMetodoPago("");
    setMontoPagado("");
    setMontoEquipaje("");
    setDetallePago("");
  };

  useEffect(() => {
    obtenerPagos();
  }, []);

  return (
    <div className="pagos-wrapper">
      <h1>Gestión de Pagos</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      {/* Formulario de ingreso */}
      <div className="pagos-card">
        <input
          type="number"
          placeholder="ID Factura"
          value={idFactura}
          onChange={(e) => setIdFactura(e.target.value)}
        />
        <input
          type="text"
          placeholder="Método de Pago"
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Monto Pagado"
          value={montoPagado}
          onChange={(e) => setMontoPagado(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Monto Equipaje"
          value={montoEquipaje}
          onChange={(e) => setMontoEquipaje(e.target.value)}
        />
        <input
          type="text"
          placeholder="Detalle de Pago"
          value={detallePago}
          onChange={(e) => setDetallePago(e.target.value)}
        />
        <button onClick={agregarPago}>Agregar Pago</button>
      </div>

      {/* Buscador por ID */}
      <div className="pagos-card">
        <input
          type="number"
          placeholder="Buscar pago por ID"
          value={idBuscar}
          onChange={(e) => setIdBuscar(e.target.value)}
        />
        <button onClick={buscarPagoPorId}>Buscar</button>

        {pagoEncontrado && (
          <div className="pago-encontrado">
            <h3>Resultado de la búsqueda:</h3>
            <ul>
              <li><strong>ID:</strong> {pagoEncontrado[0]}</li>
              <li><strong>ID Factura:</strong> {pagoEncontrado[1]}</li>
              <li><strong>Método:</strong> {pagoEncontrado[2]}</li>
              <li><strong>Monto Pagado:</strong> {pagoEncontrado[3]}</li>
              <li><strong>Monto Equipaje:</strong> {pagoEncontrado[4]}</li>
              <li><strong>Detalle:</strong> {pagoEncontrado[5]}</li>
              <li><strong>Fecha:</strong> {new Date(pagoEncontrado[6]).toLocaleString()}</li>
            </ul>
          </div>
        )}
      </div>

      {/* Tabla de pagos */}
      <table className="pagos-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Factura</th>
            <th>Método</th>
            <th>Monto Pagado</th>
            <th>Monto Equipaje</th>
            <th>Detalle</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago[0]}>
              <td>{pago[0]}</td>
              <td>{pago[1]}</td>
              <td>{pago[2]}</td>
              <td>{pago[3]}</td>
              <td>{pago[4]}</td>
              <td>{pago[5]}</td>
              <td>{new Date(pago[6]).toLocaleString()}</td>
              <td>
                <button onClick={() => eliminarPago(pago[0])}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pagos;