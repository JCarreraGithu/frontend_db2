

import  { useState, useEffect } from 'react';
import './Mercancias.css';

interface Mercancia {
  id: number;
  descripcion: string;
  peso: number;
  id_reserva: number;
}

const Mercancias = () => {
  const [mercancias, setMercancias] = useState<Mercancia[]>([]);
  const [descripcion, setDescripcion] = useState('');
  const [peso, setPeso] = useState<number>(0);
  const [idReserva, setIdReserva] = useState<number>(0);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [idBuscar, setIdBuscar] = useState('');
  const [mercanciaEncontrada, setMercanciaEncontrada] = useState<Mercancia | null>(null);

  const API_URL = 'http://localhost:3000/api/mercancias';

  useEffect(() => {
    obtenerMercancias();
  }, []);

  const obtenerMercancias = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const formateado = data.map((item: any[]) => ({
        id: item[0],
        descripcion: item[1],
        peso: item[2],
        id_reserva: item[3],
      }));
      setMercancias(formateado);
    } catch (err) {
      setError('Error al obtener las mercancías.');
    }
  };

  const agregarMercancia = async () => {
    try {
      const nueva = {
        descripcion,
        peso,
        id_reserva: idReserva,
      };
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nueva),
      });
      if (res.ok) {
        setMensaje('¡Mercancía agregada!');
        setDescripcion('');
        setPeso(0);
        setIdReserva(0);
        obtenerMercancias();
      } else {
        throw new Error();
      }
    } catch (err) {
      setError('Error al agregar mercancía.');
    }
  };

  const eliminarMercancia = async (id: number) => {
    try {
      const res = await fetch('${API_URL}/${id}', {
        method: 'DELETE',
      });
      if (res.ok) {
        setMensaje('¡Mercancía eliminada!');
        obtenerMercancias();
      } else {
        throw new Error();
      }
    } catch (err) {
      setError('Error al eliminar mercancía.');
    }
  };

  const buscarPorId = async () => {
    setMercanciaEncontrada(null);
    setMensaje('');
    setError('');
    try {
      const res = await fetch('${API_URL}/${idBuscar}');
      if (res.ok) {
        const data = await res.json();
        const encontrada: Mercancia = {
          id: data[0],
          descripcion: data[1],
          peso: data[2],
          id_reserva: data[3],
        };
        setMercanciaEncontrada(encontrada);
      } else {
        setError('Mercancía no encontrada.');
      }
    } catch (err) {
      setError('Error al buscar mercancía.');
    }
  };

  return (
    <div className="pagos-wrapper">
      <h1>Gestión de Mercancías</h1>

      {mensaje && <div className="mensaje">{mensaje}</div>}
      {error && <div className="error">{error}</div>}

      <div className="pagos-card">
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="number"
          placeholder="Peso"
          value={peso}
          onChange={(e) => setPeso(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="ID Reserva"
          value={idReserva}
          onChange={(e) => setIdReserva(Number(e.target.value))}
        />
        <button onClick={agregarMercancia}>Agregar Mercancía</button>
      </div>

      <div className="pagos-card">
        <input
          type="text"
          placeholder="Buscar por ID"
          value={idBuscar}
          onChange={(e) => setIdBuscar(e.target.value)}
        />
        <button onClick={buscarPorId}>Buscar</button>

        {mercanciaEncontrada && (
          <div className="pago-encontrado">
            <h3>Mercancía Encontrada:</h3>
            <ul>
              <li><strong>ID:</strong> {mercanciaEncontrada.id}</li>
              <li><strong>Descripción:</strong> {mercanciaEncontrada.descripcion}</li>
              <li><strong>Peso:</strong> {mercanciaEncontrada.peso}</li>
              <li><strong>ID Reserva:</strong> {mercanciaEncontrada.id_reserva}</li>
            </ul>
          </div>
        )}
      </div>

      <table className="pagos-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Peso</th>
            <th>ID Reserva</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mercancias.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.descripcion}</td>
              <td>{m.peso}</td>
              <td>{m.id_reserva}</td>
              <td>
                <button onClick={() => eliminarMercancia(m.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mercancias;