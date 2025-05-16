import { useState } from "react";

type Arresto = {
  id_arresto: number;
  id_personal: number;
  detalle: string;
  fecha_arresto: Date;
};

const GestionArrestos = () => {
  const [arrestos, setArrestos] = useState<Arresto[]>([
    { id_arresto: 1, id_personal: 201, detalle: "Incidente en zona de embarque", fecha_arresto: new Date() },
    { id_arresto: 2, id_personal: 202, detalle: "Intervención en área de carga", fecha_arresto: new Date() },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<Arresto>>({});

  const agregarArresto = (nuevoArresto: Omit<Arresto, "id_arresto">) => {
    setArrestos([...arrestos, { id_arresto: Date.now(), ...nuevoArresto }]);
  };

  const editarArresto = (id_arresto: number, datosActualizados: Partial<Arresto>) => {
    setArrestos(arrestos.map((a) => (a.id_arresto === id_arresto ? { ...a, ...datosActualizados } : a)));
  };

  const eliminarArresto = (id_arresto: number) => {
    setArrestos(arrestos.filter((a) => a.id_arresto !== id_arresto));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Gestión de Arrestos</h2>
      <p className="gestion-descripcion">
        Administra el registro de incidentes y acciones de seguridad realizadas por el personal.
      </p>
      <div className="tarjetas-container">
        {arrestos.map((arresto) => (
          <div key={arresto.id_arresto} className="tarjeta">
            {editandoId === arresto.id_arresto ? (
              <div>
                <input
                  type="number"
                  value={datosEditados.id_personal || arresto.id_personal}
                  onChange={(e) => setDatosEditados({ ...datosEditados, id_personal: Number(e.target.value) })}
                  placeholder="ID Personal"
                />
                <input
                  type="text"
                  value={datosEditados.detalle || arresto.detalle}
                  onChange={(e) => setDatosEditados({ ...datosEditados, detalle: e.target.value })}
                  placeholder="Detalle del incidente"
                />
                <input
                  type="date"
                  value={datosEditados.fecha_arresto?.toISOString().split("T")[0] || arresto.fecha_arresto.toISOString().split("T")[0]}
                  onChange={(e) => setDatosEditados({ ...datosEditados, fecha_arresto: new Date(e.target.value) })}
                  placeholder="Fecha del arresto"
                />
                <button
                  onClick={() => {
                    editarArresto(arresto.id_arresto, datosEditados);
                    setEditandoId(null);
                    setDatosEditados({});
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>Arresto {arresto.id_arresto}</h3>
                <p>ID Personal: {arresto.id_personal}</p>
                <p>Detalle: {arresto.detalle}</p>
                <p>Fecha: {arresto.fecha_arresto.toLocaleDateString()}</p>
                <button onClick={() => eliminarArresto(arresto.id_arresto)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditandoId(arresto.id_arresto);
                    setDatosEditados(arresto);
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
          agregarArresto({ id_personal: 203, detalle: "Nuevo incidente registrado", fecha_arresto: new Date() })
        }
      >
        Agregar Arresto
      </button>
    </div>
  );
};

export default GestionArrestos;