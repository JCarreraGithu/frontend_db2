import { useState } from 'react';
import '../Gestion_Usuarios/GestionUsuarios.css';


type Aeropuerto = {
  id: number;
  nombre: string;
  tipo: "Nacional" | "Internacional";
  activo: boolean;
};

const GestionOperaciones = () => {
  const [aeropuertos, setAeropuertos] = useState<Aeropuerto[]>([
    { id: 1, nombre: "Aeropuerto Internacional", tipo: "Internacional", activo: true },
    { id: 2, nombre: "Aeropuerto Nacional", tipo: "Nacional", activo: true },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<Aeropuerto>>({});

  const agregarAeropuerto = (nuevoAeropuerto: Omit<Aeropuerto, 'id'>) => {
    setAeropuertos([...aeropuertos, { id: Date.now(), ...nuevoAeropuerto }]);
  };

  const editarAeropuerto = (id: number, datosActualizados: Partial<Aeropuerto>) => {
    setAeropuertos(aeropuertos.map(a => (a.id === id ? { ...a, ...datosActualizados } : a)));
  };

  const eliminarAeropuerto = (id: number) => {
    setAeropuertos(aeropuertos.filter(a => a.id !== id));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Gestión de Operaciones de Vuelo</h2>
      <div className="tarjetas-container">
        {aeropuertos.map(aeropuerto => (
          <div key={aeropuerto.id} className="tarjeta">
            {editandoId === aeropuerto.id ? (
              <div>
                <input
                  type="text"
                  value={datosEditados.nombre || aeropuerto.nombre}
                  onChange={(e) => setDatosEditados({ ...datosEditados, nombre: e.target.value })}
                  placeholder="Nuevo nombre"
                />
                <select
                  value={datosEditados.tipo || aeropuerto.tipo}
                  onChange={(e) => setDatosEditados({ ...datosEditados, tipo: e.target.value as "Nacional" | "Internacional" })}
                >
                  <option value="Nacional">Nacional</option>
                  <option value="Internacional">Internacional</option>
                </select>
                <button onClick={() => {
                  editarAeropuerto(aeropuerto.id, datosEditados);
                  setEditandoId(null);
                  setDatosEditados({});
                }}>
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>{aeropuerto.nombre}</h3>
                <p>Tipo: {aeropuerto.tipo}</p>
                <p>Estado: {aeropuerto.activo ? "Operativo" : "No operativo"}</p>
                <button onClick={() => editarAeropuerto(aeropuerto.id, { activo: !aeropuerto.activo })}>
                  {aeropuerto.activo ? "Desactivar" : "Activar"}
                </button>
                <button onClick={() => eliminarAeropuerto(aeropuerto.id)}>Eliminar</button>
                <button onClick={() => {
                  setEditandoId(aeropuerto.id);
                  setDatosEditados(aeropuerto);
                }}>
                  Editar
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => agregarAeropuerto({ nombre: "Nuevo Aeropuerto", tipo: "Internacional", activo: true })}>
        Agregar Aeropuerto
      </button>
    </div>
  );
};

export default GestionOperaciones;