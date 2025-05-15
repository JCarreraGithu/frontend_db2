import { useEffect, useState } from 'react';

type EquipajeItem = {
  id: number;
  id_reserva: number;
  peso: number;
  dimensiones: string;
  estado: string;
};

const Equipaje = () => {
  const [equipajes, setEquipajes] = useState<EquipajeItem[]>([]);
  const [nuevoEquipaje, setNuevoEquipaje] = useState({
    id_reserva: '',
    peso: '',
    dimensiones: '',
    estado: '',
  });
  const [busquedaID, setBusquedaID] = useState('');
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const limpiarMensaje = () => setTimeout(() => setMensaje(null), 3000);
  const limpiarError = () => setTimeout(() => setError(null), 3000);

  const obtenerEquipajes = () => {
    fetch('http://localhost:3000/api/equipajes')
      .then(res => res.json())
      .then(data => {
        const formateados = data.data.map((item: any[]) => ({
          id: item[0],
          id_reserva: item[1],
          peso: item[2],
          dimensiones: item[3],
          estado: item[4],
        }));
        setEquipajes(formateados);
      })
      .catch(() => {
        setError('❌ Error al cargar equipajes');
        limpiarError();
      });
  };

  useEffect(() => {
    obtenerEquipajes();
  }, []);

  const añadirEquipaje = () => {
    fetch('http://localhost:3000/api/equipajes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoEquipaje),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al crear equipaje');
        return res.json();
      })
      .then(() => {
        setMensaje('✅ Equipaje insertado exitosamente');
        setNuevoEquipaje({ id_reserva: '', peso: '', dimensiones: '', estado: '' });
        obtenerEquipajes();
        limpiarMensaje();
      })
      .catch(err => {
        setError('❌ Error al insertar equipaje');
        limpiarError();
      });
  };

  const eliminarEquipaje = (id: number) => {
    if (!confirm(`¿Eliminar equipaje con ID ${id}?`)) return;
    fetch(`http://localhost:3000/api/equipajes/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al eliminar');
        obtenerEquipajes();
        setMensaje('🗑️ Equipaje eliminado');
        limpiarMensaje();
      })
      .catch(() => {
        setError('❌ Error al eliminar equipaje');
        limpiarError();
      });
  };

  const buscarPorID = () => {
    if (!busquedaID) {
      obtenerEquipajes();
      return;
    }

    fetch(`http://localhost:3000/api/equipajes/${busquedaID}`)
      .then(res => res.json())
      .then(data => {
        if (!data.success || !data.data || data.data.length === 0) {
          setError('❌ Equipaje no encontrado');
          limpiarError();
          return;
        }

        const item = Array.isArray(data.data[0]) ? data.data[0] : data.data;
        const equipaje = {
          id: item[0],
          id_reserva: item[1],
          peso: item[2],
          dimensiones: item[3],
          estado: item[4],
        };

        setEquipajes([equipaje]);
      })
      .catch(() => {
        setError('❌ Error al buscar equipaje');
        limpiarError();
      });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🎒 Gestión de Equipajes</h1>

      {mensaje && <p style={{ color: 'green', fontWeight: 'bold' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      {/* FORMULARIO */}
      <section style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>➕ Añadir Equipaje</h3>
        <input
          type="number"
          placeholder="ID Reserva"
          value={nuevoEquipaje.id_reserva}
          onChange={e => setNuevoEquipaje({ ...nuevoEquipaje, id_reserva: e.target.value })}
        />
        <input
          type="number"
          placeholder="Peso (kg)"
          value={nuevoEquipaje.peso}
          onChange={e => setNuevoEquipaje({ ...nuevoEquipaje, peso: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dimensiones"
          value={nuevoEquipaje.dimensiones}
          onChange={e => setNuevoEquipaje({ ...nuevoEquipaje, dimensiones: e.target.value })}
        />
        <input
          type="text"
          placeholder="Estado"
          value={nuevoEquipaje.estado}
          onChange={e => setNuevoEquipaje({ ...nuevoEquipaje, estado: e.target.value })}
        />
        <button onClick={añadirEquipaje}>➕ Añadir</button>
      </section>

      {/* BÚSQUEDA */}
      <section style={{ marginBottom: '20px' }}>
        <h3>🔍 Buscar Equipaje por ID</h3>
        <input
          type="number"
          placeholder="ID"
          value={busquedaID}
          onChange={e => setBusquedaID(e.target.value)}
        />
        <button onClick={buscarPorID}>🔎 Buscar</button>
        <button onClick={obtenerEquipajes}>🔄 Ver Todos</button>
      </section>

      {/* TABLA */}
      <h2>📋 Lista de Equipajes</h2>
      <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Reserva</th>
            <th>Peso</th>
            <th>Dimensiones</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {equipajes.map(eq => (
            <tr key={eq.id}>
              <td>{eq.id}</td>
              <td>{eq.id_reserva}</td>
              <td>{eq.peso}</td>
              <td>{eq.dimensiones}</td>
              <td>{eq.estado}</td>
              <td>
                <button onClick={() => eliminarEquipaje(eq.id)} style={{ color: 'red' }}>
                  ❌ Eliminar
                </button>
              </td>
            </tr>
          ))}
          {equipajes.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>No hay equipajes</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Equipaje;
