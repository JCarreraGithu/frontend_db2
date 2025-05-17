import  { useEffect, useState } from 'react';
import axios from 'axios';
import './Arrestos.css';

interface Arresto {
  id: number;
  personaId: number;
  motivo: string;
  fecha: string;
}

const Arrestos = () => {
  const [arrestos, setArrestos] = useState<Arresto[]>([]);
  const [arrestoId, setArrestoId] = useState('');
  const [arrestoEncontrado, setArrestoEncontrado] = useState<Arresto | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerArrestos();
  }, []);

  const obtenerArrestos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/arrestos');
      const data = res.data.map((item: any[]) => ({
        id: item[0],
        personaId: item[1],
        motivo: item[2],
        fecha: item[3],
      }));
      setArrestos(data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los arrestos.');
    }
  };

  const eliminarArresto = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/arrestos/${id}`);
      setMensaje(`Arresto ${id} eliminado con éxito.`);
      setError('');
      setArrestoEncontrado(null);
      obtenerArrestos();
    } catch (err) {
      console.error(err);
      setError('No se pudo eliminar el arresto.');
      setMensaje('');
    }
  };

  const buscarArrestoPorId = async () => {
    if (!arrestoId) return;
    try {
      const res = await axios.get(`http://localhost:3000/api/arrestos/${arrestoId}`);
      const item = res.data;
      const arresto: Arresto = {
        id: item[0],
        personaId: item[1],
        motivo: item[2],
        fecha: item[3],
      };
      setArrestoEncontrado(arresto);
      setError('');
      setMensaje('');
    } catch (err) {
      console.error(err);
      setArrestoEncontrado(null);
      setError(`No se encontró arresto con ID ${arrestoId}.`);
    }
  };

  const formatearFecha = (fecha: string) =>
    new Date(fecha).toLocaleDateString('es-ES');

  return (
    <div className="pagos-wrapper">
      <h1>Arrestos Registrados</h1>

      <div className="pagos-card">
        <input
          type="number"
          placeholder="Ingrese ID de arresto"
          value={arrestoId}
          onChange={(e) => setArrestoId(e.target.value)}
        />
        <button onClick={buscarArrestoPorId}>Buscar</button>
      </div>

      {mensaje && <div className="mensaje">{mensaje}</div>}
      {error && <div className="error">{error}</div>}

      {arrestoEncontrado && (
        <div className="pago-encontrado">
          <h3>Arresto encontrado:</h3>
          <ul>
            <li><strong>ID:</strong> {arrestoEncontrado.id}</li>
            <li><strong>ID Persona:</strong> {arrestoEncontrado.personaId}</li>
            <li><strong>Motivo:</strong> {arrestoEncontrado.motivo}</li>
            <li><strong>Fecha:</strong> {formatearFecha(arrestoEncontrado.fecha)}</li>
          </ul>
          <button
            onClick={() => eliminarArresto(arrestoEncontrado.id)}
            style={{ backgroundColor: '#dc3545' }}
          >
            Eliminar
          </button>
        </div>
      )}

      <div className="pagos-card">
        <table className="pagos-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Persona</th>
              <th>Motivo</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {arrestos.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.personaId}</td>
                <td>{a.motivo}</td>
                <td>{formatearFecha(a.fecha)}</td>
                <td>
                  <button
                    onClick={() => eliminarArresto(a.id)}
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
    </div>
  );
};

export default Arrestos;
