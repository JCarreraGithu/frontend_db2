import { useState } from "react";

type Avion = {
  id: number;
  matricula: string;
  modelo: string;
  capacidad: number;
  estadoTecnico: "Operativo" | "Mantenimiento" | "Fuera de servicio";
};

const GestionAviones = () => {
  const [aviones, setAviones] = useState<Avion[]>([
    { id: 1, matricula: "XA-123", modelo: "Boeing 737", capacidad: 180, estadoTecnico: "Operativo" },
    { id: 2, matricula: "XB-456", modelo: "Airbus A320", capacidad: 160, estadoTecnico: "Mantenimiento" },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<Avion>>({});

  const agregarAvion = (nuevoAvion: Omit<Avion, "id">) => {
    setAviones([...aviones, { id: Date.now(), ...nuevoAvion }]);
  };

  const editarAvion = (id: number, datosActualizados: Partial<Avion>) => {
    setAviones(aviones.map((a) => (a.id === id ? { ...a, ...datosActualizados } : a)));
  };

  const eliminarAvion = (id: number) => {
    setAviones(aviones.filter((a) => a.id !== id));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Aviones</h2>
      <p className="gestion-descripcion">
        Controla la flota de aeronaves incluyendo su matrícula, modelo, capacidad y estado técnico para asegurar vuelos seguros.
      </p>
      <div className="tarjetas-container">
        {aviones.map((avion) => (
          <div key={avion.id} className="tarjeta">
            {editandoId === avion.id ? (
              <div>
                <input
                  type="text"
                  value={datosEditados.matricula || avion.matricula}
                  onChange={(e) => setDatosEditados({ ...datosEditados, matricula: e.target.value })}
                  placeholder="Matrícula"
                />
                <input
                  type="text"
                  value={datosEditados.modelo || avion.modelo}
                  onChange={(e) => setDatosEditados({ ...datosEditados, modelo: e.target.value })}
                  placeholder="Modelo"
                />
                <input
                  type="number"
                  value={datosEditados.capacidad || avion.capacidad}
                  onChange={(e) => setDatosEditados({ ...datosEditados, capacidad: parseInt(e.target.value) })}
                  placeholder="Capacidad"
                />
                <select
                  value={datosEditados.estadoTecnico || avion.estadoTecnico}
                  onChange={(e) => setDatosEditados({ ...datosEditados, estadoTecnico: e.target.value as "Operativo" | "Mantenimiento" | "Fuera de servicio" })}
                >
                  <option value="Operativo">Operativo</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                  <option value="Fuera de servicio">Fuera de servicio</option>
                </select>
                <button
                  onClick={() => {
                    editarAvion(avion.id, datosEditados);
                    setEditandoId(null);
                    setDatosEditados({});
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>{avion.matricula}</h3>
                <p>Modelo: {avion.modelo}</p>
                <p>Capacidad: {avion.capacidad} pasajeros</p>
                <p>Estado técnico: {avion.estadoTecnico}</p>
                <button onClick={() => editarAvion(avion.id, { estadoTecnico: "Mantenimiento" })}>
                  Enviar a mantenimiento
                </button>
                <button onClick={() => eliminarAvion(avion.id)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditandoId(avion.id);
                    setDatosEditados(avion);
                  }}
                >
                  Editar
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          agregarAvion({ matricula: "XC-789", modelo: "Boeing 777", capacidad: 350, estadoTecnico: "Operativo" })
        }
      >
        Agregar Avión
      </button>
    </div>
  );
};

export default GestionAviones;