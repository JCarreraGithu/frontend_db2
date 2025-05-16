import { useState } from "react";

type MantenimientoPista = {
  id_mantenimiento_pista: number;
  id_pista: number;
  fecha_mantenimiento: Date;
  descripcion: string;
  estado: "programado" | "en progreso" | "finalizado";
};

const GestionMantenimientoPistas = () => {
  const [mantenimientos, setMantenimientos] = useState<MantenimientoPista[]>([
    { id_mantenimiento_pista: 1, id_pista: 101, fecha_mantenimiento: new Date(), descripcion: "Reparación de grietas", estado: "programado" },
    { id_mantenimiento_pista: 2, id_pista: 102, fecha_mantenimiento: new Date(), descripcion: "Pintado de señalización", estado: "en progreso" },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<MantenimientoPista>>({});

  const agregarMantenimiento = (nuevoMantenimiento: Omit<MantenimientoPista, "id_mantenimiento_pista">) => {
    setMantenimientos([...mantenimientos, { id_mantenimiento_pista: Date.now(), ...nuevoMantenimiento }]);
  };

  const editarMantenimiento = (id_mantenimiento_pista: number, datosActualizados: Partial<MantenimientoPista>) => {
    setMantenimientos(
      mantenimientos.map((m) => (m.id_mantenimiento_pista === id_mantenimiento_pista ? { ...m, ...datosActualizados } : m))
    );
  };

  const eliminarMantenimiento = (id_mantenimiento_pista: number) => {
    setMantenimientos(mantenimientos.filter((m) => m.id_mantenimiento_pista !== id_mantenimiento_pista));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Gestión de Mantenimiento de Pistas</h2>
      <p className="gestion-descripcion">
        Administra el historial y la programación del mantenimiento de cada pista del aeropuerto, incluyendo fechas, estados y detalles.
      </p>
      <div className="tarjetas-container">
        {mantenimientos.map((mantenimiento) => (
          <div key={mantenimiento.id_mantenimiento_pista} className="tarjeta">
            {editandoId === mantenimiento.id_mantenimiento_pista ? (
              <div>
                <input
                  type="number"
                  value={datosEditados.id_pista || mantenimiento.id_pista}
                  onChange={(e) => setDatosEditados({ ...datosEditados, id_pista: Number(e.target.value) })}
                  placeholder="ID Pista"
                />
                <input
                  type="date"
                  value={datosEditados.fecha_mantenimiento?.toISOString().split("T")[0] || mantenimiento.fecha_mantenimiento.toISOString().split("T")[0]}
                  onChange={(e) => setDatosEditados({ ...datosEditados, fecha_mantenimiento: new Date(e.target.value) })}
                  placeholder="Fecha de mantenimiento"
                />
                <input
                  type="text"
                  value={datosEditados.descripcion || mantenimiento.descripcion}
                  onChange={(e) => setDatosEditados({ ...datosEditados, descripcion: e.target.value })}
                  placeholder="Descripción"
                />
                <select
                  value={datosEditados.estado || mantenimiento.estado}
                  onChange={(e) => setDatosEditados({ ...datosEditados, estado: e.target.value as MantenimientoPista["estado"] })}
                >
                  <option value="programado">Programado</option>
                  <option value="en progreso">En progreso</option>
                  <option value="finalizado">Finalizado</option>
                </select>
                <button
                  onClick={() => {
                    editarMantenimiento(mantenimiento.id_mantenimiento_pista, datosEditados);
                    setEditandoId(null);
                    setDatosEditados({});
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>Mantenimiento {mantenimiento.id_mantenimiento_pista}</h3>
                <p>ID Pista: {mantenimiento.id_pista}</p>
                <p>Fecha: {mantenimiento.fecha_mantenimiento.toLocaleDateString()}</p>
                <p>Descripción: {mantenimiento.descripcion}</p>
                <p>Estado: {mantenimiento.estado}</p>
                <button onClick={() => eliminarMantenimiento(mantenimiento.id_mantenimiento_pista)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditandoId(mantenimiento.id_mantenimiento_pista);
                    setDatosEditados(mantenimiento);
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
          agregarMantenimiento({
            id_pista: 103,
            fecha_mantenimiento: new Date(),
            descripcion: "Nueva inspección",
            estado: "programado",
          })
        }
      >
        Agregar Mantenimiento
      </button>
    </div>
  );
};

export default GestionMantenimientoPistas;