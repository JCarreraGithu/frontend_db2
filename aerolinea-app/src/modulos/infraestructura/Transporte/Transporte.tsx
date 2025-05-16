import { useState } from "react";

type Transporte = {
  id_transporte: number;
  tipo: "bus" | "van" | "camioneta";
  capacidad: number;
  estado: "operativo" | "en mantenimiento" | "inactivo";
};

const GestionTransporte = () => {
  const [transportes, setTransportes] = useState<Transporte[]>([
    { id_transporte: 1, tipo: "bus", capacidad: 40, estado: "operativo" },
    { id_transporte: 2, tipo: "van", capacidad: 15, estado: "en mantenimiento" },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<Transporte>>({});

  const agregarTransporte = (nuevoTransporte: Omit<Transporte, "id_transporte">) => {
    setTransportes([...transportes, { id_transporte: Date.now(), ...nuevoTransporte }]);
  };

  const editarTransporte = (id_transporte: number, datosActualizados: Partial<Transporte>) => {
    setTransportes(transportes.map((t) => (t.id_transporte === id_transporte ? { ...t, ...datosActualizados } : t)));
  };

  const eliminarTransporte = (id_transporte: number) => {
    setTransportes(transportes.filter((t) => t.id_transporte !== id_transporte));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Gestión de Transporte</h2>
      <p className="gestion-descripcion">
        Administra el registro de vehículos destinados al traslado en el aeropuerto, incluyendo su tipo, capacidad y estado operativo.
      </p>
      <div className="tarjetas-container">
        {transportes.map((transporte) => (
          <div key={transporte.id_transporte} className="tarjeta">
            {editandoId === transporte.id_transporte ? (
              <div>
                <select
                  value={datosEditados.tipo || transporte.tipo}
                  onChange={(e) => setDatosEditados({ ...datosEditados, tipo: e.target.value as Transporte["tipo"] })}
                >
                  <option value="bus">Bus</option>
                  <option value="van">Van</option>
                  <option value="camioneta">Camioneta</option>
                </select>
                <input
                  type="number"
                  value={datosEditados.capacidad || transporte.capacidad}
                  onChange={(e) => setDatosEditados({ ...datosEditados, capacidad: Number(e.target.value) })}
                  placeholder="Capacidad (pasajeros o carga)"
                />
                <select
                  value={datosEditados.estado || transporte.estado}
                  onChange={(e) => setDatosEditados({ ...datosEditados, estado: e.target.value as Transporte["estado"] })}
                >
                  <option value="operativo">Operativo</option>
                  <option value="en mantenimiento">En mantenimiento</option>
                  <option value="inactivo">Inactivo</option>
                </select>
                <button
                  onClick={() => {
                    editarTransporte(transporte.id_transporte, datosEditados);
                    setEditandoId(null);
                    setDatosEditados({});
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>Transporte {transporte.id_transporte}</h3>
                <p>Tipo: {transporte.tipo}</p>
                <p>Capacidad: {transporte.capacidad} pasajeros/carga</p>
                <p>Estado: {transporte.estado}</p>
                <button onClick={() => eliminarTransporte(transporte.id_transporte)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditandoId(transporte.id_transporte);
                    setDatosEditados(transporte);
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
          agregarTransporte({ tipo: "bus", capacidad: 50, estado: "operativo" })
        }
      >
        Agregar Transporte
      </button>
    </div>
  );
};

export default GestionTransporte;