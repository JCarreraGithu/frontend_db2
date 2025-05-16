import { useState } from "react";

type OperacionTerrestre = {
  id_operacion_terrestre: number;
  id_aeropuerto: number;
  descripcion: string;
  fecha_operacion: Date;
};

const GestionOperacionesTerrestres = () => {
  const [operaciones, setOperaciones] = useState<OperacionTerrestre[]>([
    { id_operacion_terrestre: 1, id_aeropuerto: 101, descripcion: "Carga de equipaje para vuelo internacional", fecha_operacion: new Date() },
    { id_operacion_terrestre: 2, id_aeropuerto: 102, descripcion: "Revisión de pista antes del despegue", fecha_operacion: new Date() },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<OperacionTerrestre>>({});

  const agregarOperacion = (nuevaOperacion: Omit<OperacionTerrestre, "id_operacion_terrestre">) => {
    setOperaciones([...operaciones, { id_operacion_terrestre: Date.now(), ...nuevaOperacion }]);
  };

  const editarOperacion = (id_operacion_terrestre: number, datosActualizados: Partial<OperacionTerrestre>) => {
    setOperaciones(operaciones.map((o) => (o.id_operacion_terrestre === id_operacion_terrestre ? { ...o, ...datosActualizados } : o)));
  };

  const eliminarOperacion = (id_operacion_terrestre: number) => {
    setOperaciones(operaciones.filter((o) => o.id_operacion_terrestre !== id_operacion_terrestre));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Gestión de Operaciones Terrestres</h2>
      <p className="gestion-descripcion">
        Administra las operaciones en tierra del aeropuerto, incluyendo carga, despacho de equipaje y mantenimiento.
      </p>
      <div className="tarjetas-container">
        {operaciones.map((operacion) => (
          <div key={operacion.id_operacion_terrestre} className="tarjeta">
            {editandoId === operacion.id_operacion_terrestre ? (
              <div>
                <input
                  type="number"
                  value={datosEditados.id_aeropuerto || operacion.id_aeropuerto}
                  onChange={(e) => setDatosEditados({ ...datosEditados, id_aeropuerto: Number(e.target.value) })}
                  placeholder="ID Aeropuerto"
                />
                <input
                  type="text"
                  value={datosEditados.descripcion || operacion.descripcion}
                  onChange={(e) => setDatosEditados({ ...datosEditados, descripcion: e.target.value })}
                  placeholder="Descripción de la operación"
                />
                <input
                  type="date"
                  value={datosEditados.fecha_operacion?.toISOString().split("T")[0] || operacion.fecha_operacion.toISOString().split("T")[0]}
                  onChange={(e) => setDatosEditados({ ...datosEditados, fecha_operacion: new Date(e.target.value) })}
                  placeholder="Fecha del evento"
                />
                <button
                  onClick={() => {
                    editarOperacion(operacion.id_operacion_terrestre, datosEditados);
                    setEditandoId(null);
                    setDatosEditados({});
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>Operación {operacion.id_operacion_terrestre}</h3>
                <p>ID Aeropuerto: {operacion.id_aeropuerto}</p>
                <p>Descripción: {operacion.descripcion}</p>
                <p>Fecha: {operacion.fecha_operacion.toLocaleDateString()}</p>
                <button onClick={() => eliminarOperacion(operacion.id_operacion_terrestre)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditandoId(operacion.id_operacion_terrestre);
                    setDatosEditados(operacion);
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
          agregarOperacion({ id_aeropuerto: 103, descripcion: "Inspección de área de carga", fecha_operacion: new Date() })
        }
      >
        Agregar Operación
      </button>
    </div>
  );
};

export default GestionOperacionesTerrestres;