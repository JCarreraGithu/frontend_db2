import { useState } from "react";

type Pista = {
  id_pista: number;
  nombre: string;
  estado: "operativa" | "mantenimiento" | "cerrada";
  longitud: number;
  ancho: number;
};

const GestionPistas = () => {
  const [pistas, setPistas] = useState<Pista[]>([
    { id_pista: 1, nombre: "Pista Norte", estado: "operativa", longitud: 3500, ancho: 45 },
    { id_pista: 2, nombre: "Pista Sur", estado: "mantenimiento", longitud: 3200, ancho: 40 },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<Pista>>({});

  const agregarPista = (nuevaPista: Omit<Pista, "id_pista">) => {
    setPistas([...pistas, { id_pista: Date.now(), ...nuevaPista }]);
  };

  const editarPista = (id_pista: number, datosActualizados: Partial<Pista>) => {
    setPistas(pistas.map((p) => (p.id_pista === id_pista ? { ...p, ...datosActualizados } : p)));
  };

  const eliminarPista = (id_pista: number) => {
    setPistas(pistas.filter((p) => p.id_pista !== id_pista));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Gestión de Pistas</h2>
      <p className="gestion-descripcion">
        Administra el registro de pistas de aterrizaje y despegue del aeropuerto, incluyendo su estado y dimensiones.
      </p>
      <div className="tarjetas-container">
        {pistas.map((pista) => (
          <div key={pista.id_pista} className="tarjeta">
            {editandoId === pista.id_pista ? (
              <div>
                <input
                  type="text"
                  value={datosEditados.nombre || pista.nombre}
                  onChange={(e) => setDatosEditados({ ...datosEditados, nombre: e.target.value })}
                  placeholder="Nombre de la pista"
                />
                <select
                  value={datosEditados.estado || pista.estado}
                  onChange={(e) => setDatosEditados({ ...datosEditados, estado: e.target.value as Pista["estado"] })}
                >
                  <option value="operativa">Operativa</option>
                  <option value="mantenimiento">Mantenimiento</option>
                  <option value="cerrada">Cerrada</option>
                </select>
                <input
                  type="number"
                  value={datosEditados.longitud || pista.longitud}
                  onChange={(e) => setDatosEditados({ ...datosEditados, longitud: Number(e.target.value) })}
                  placeholder="Longitud (m)"
                />
                <input
                  type="number"
                  value={datosEditados.ancho || pista.ancho}
                  onChange={(e) => setDatosEditados({ ...datosEditados, ancho: Number(e.target.value) })}
                  placeholder="Ancho (m)"
                />
                <button
                  onClick={() => {
                    editarPista(pista.id_pista, datosEditados);
                    setEditandoId(null);
                    setDatosEditados({});
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>{pista.nombre}</h3>
                <p>Estado: {pista.estado}</p>
                <p>Longitud: {pista.longitud} m</p>
                <p>Ancho: {pista.ancho} m</p>
                <button onClick={() => eliminarPista(pista.id_pista)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditandoId(pista.id_pista);
                    setDatosEditados(pista);
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
          agregarPista({ nombre: "Nueva Pista", estado: "operativa", longitud: 3000, ancho: 50 })
        }
      >
        Agregar Pista
      </button>
    </div>
  );
};

export default GestionPistas;