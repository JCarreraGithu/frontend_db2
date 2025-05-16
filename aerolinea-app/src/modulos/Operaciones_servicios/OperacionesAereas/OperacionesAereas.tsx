import { useState } from "react";

type OperacionAerea = {
  id_operacion_aerea: number;
  id_vuelo: number;
  descripcion: string;
  fecha_operacion: Date;
};

const GestionOperacionesAereas = () => {
  const [operaciones, setOperaciones] = useState<OperacionAerea[]>([
    { id_operacion_aerea: 1, id_vuelo: 501, descripcion: "Ajuste de ruta debido a condiciones climáticas", fecha_operacion: new Date() },
    { id_operacion_aerea: 2, id_vuelo: 502, descripcion: "Revisión técnica de equipo de comunicación", fecha_operacion: new Date() },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<OperacionAerea>>({});

  const agregarOperacion = (nuevaOperacion: Omit<OperacionAerea, "id_operacion_aerea">) => {
    setOperaciones([...operaciones, { id_operacion_aerea: Date.now(), ...nuevaOperacion }]);
  };

  const editarOperacion = (id_operacion_aerea: number, datosActualizados: Partial<OperacionAerea>) => {
    setOperaciones(operaciones.map((o) => (o.id_operacion_aerea === id_operacion_aerea ? { ...o, ...datosActualizados } : o)));
  };

  const eliminarOperacion = (id_operacion_aerea: number) => {
    setOperaciones(operaciones.filter((o) => o.id_operacion_aerea !== id_operacion_aerea));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Gestión de Operaciones Aéreas</h2>
      <p className="gestion-descripcion">
        Administra el registro de operaciones y eventos ocurridos durante los vuelos.
      </p>
      <div className="tarjetas-container">
        {operaciones.map((operacion) => (
          <div key={operacion.id_operacion_aerea} className="tarjeta">
            {editandoId === operacion.id_operacion_aerea ? (
              <div>
                <input
                  type="number"
                  value={datosEditados.id_vuelo || operacion.id_vuelo}
                  onChange={(e) => setDatosEditados({ ...datosEditados, id_vuelo: Number(e.target.value) })}
                  placeholder="ID Vuelo"
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
                    editarOperacion(operacion.id_operacion_aerea, datosEditados);
                    setEditandoId(null);
                    setDatosEditados({});
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>Operación {operacion.id_operacion_aerea}</h3>
                <p>ID Vuelo: {operacion.id_vuelo}</p>
                <p>Descripción: {operacion.descripcion}</p>
                <p>Fecha: {operacion.fecha_operacion.toLocaleDateString()}</p>
                <button onClick={() => eliminarOperacion(operacion.id_operacion_aerea)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditandoId(operacion.id_operacion_aerea);
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
          agregarOperacion({ id_vuelo: 503, descripcion: "Procedimiento de emergencia activado", fecha_operacion: new Date() })
        }
      >
        Agregar Operación
      </button>
    </div>
  );
};

export default GestionOperacionesAereas;