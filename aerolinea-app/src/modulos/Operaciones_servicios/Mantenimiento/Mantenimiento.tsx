import { useEffect, useState } from 'react';
import axios from 'axios';
import './Estilo.css'; // Usamos los mismos estilos que usas para pagos

const baseUrl = import.meta.env.VITE_API_URL;

interface Mantenimiento {
  id: number;
  fecha: string;
  tipo: string;
  descripcion: string;
}

const MantenimientoAviones = () => {
  const [mantenimientos, setMantenimientos] = useState<Mantenimiento[]>([]);
  const [mantenimientoId, setMantenimientoId] = useState('');
  const [mantenimientoEncontrado, setMantenimientoEncontrado] = useState<Mantenimiento | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // Limpiar mensajes
  const limpiarMensaje = () => setTimeout(() => setMensaje(''), 3000);
  const limpiarError = () => setTimeout(() => setError(''), 3000);

  useEffect(() => {
    obtenerMantenimientos();
  }, []);

  const obtenerMantenimientos = async () => {
    try {
      const res = await axios.get(`${baseUrl}/mantenimiento/aviones`);
      const data = res.data.map((item: any[]) => ({
        id: item[0],
        fecha: item[1],
        tipo: item[2],
        descripcion: item[3],
      }));
      setMantenimientos(data);
    } catch (err) {
      console.error(err);
      setError('❌ Error al cargar los mantenimientos.');
      limpiarError();
    }
  };

  const buscarMantenimientoPorId = async () => {
    if (!mantenimientoId) return;
    try {
      const res = await axios.get(`${baseUrl}/mantenimiento/aviones/${mantenimientoId}`);
      const item = res.data;
      const mantenimiento: Mantenimiento = {
        id: item[0],
        fecha: item[1],
        tipo: item[2],
        descripcion: item[3],
      };
      setMantenimientoEncontrado(mantenimiento);
      setError('');
      setMensaje('');
    } catch (err) {
      console.error(err);
      setMantenimientoEncontrado(null);
      setError(`❌ No se encontró mantenimiento con ID ${mantenimientoId}.`);
      limpiarError();
    }
  };

  const eliminarMantenimiento = async (id: number) => {
    try {
      await axios.delete(`${baseUrl}/mantenimiento/aviones/${id}`);
      setMensaje(`✅ Mantenimiento ${id} eliminado con éxito.`);
      setError('');
      setMantenimientoEncontrado(null);
      obtenerMantenimientos();
      limpiarMensaje();
    } catch (err) {
      console.error(err);
      setError('❌ No se pudo eliminar el mantenimiento.');
      setMensaje('');
      limpiarError();
    }
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  return (
    <div className="pagos-wrapper">
      <h1>Mantenimientos de Aviones</h1>

      <div className="pagos-card">
        <input
          type="number"
          placeholder="Ingrese ID de mantenimiento"
          value={mantenimientoId}
          onChange={(e) => setMantenimientoId(e.target.value)}
        />
        <button onClick={buscarMantenimientoPorId}>🔎 Buscar</button>
      </div>

      {mensaje && <div className="mensaje">{mensaje}</div>}
      {error && <div className="error">{error}</div>}

      {mantenimientoEncontrado && (
        <div className="pago-encontrado">
          <h3>Mantenimiento encontrado:</h3>
          <ul>
            <li><strong>ID:</strong> {mantenimientoEncontrado.id}</li>
            <li><strong>Fecha:</strong> {formatearFecha(mantenimientoEncontrado.fecha)}</li>
            <li><strong>Tipo:</strong> {mantenimientoEncontrado.tipo}</li>
            <li><strong>Descripción:</strong> {mantenimientoEncontrado.descripcion}</li>
          </ul>
          <button
            onClick={() => eliminarMantenimiento(mantenimientoEncontrado.id)}
            style={{ backgroundColor: '#dc3545' }}
          >
            🗑️ Eliminar
          </button>
        </div>
      )}

      <div className="pagos-card">
        <table className="pagos-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mantenimientos.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{formatearFecha(m.fecha)}</td>
                <td>{m.tipo}</td>
                <td>{m.descripcion}</td>
                <td>
                  <button
                    onClick={() => eliminarMantenimiento(m.id)}
                    style={{ backgroundColor: '#dc3545' }}
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MantenimientoAviones;
