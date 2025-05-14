import { useState } from "react";

type Aerolinea = {
  id: number;
  nombre: string;
  codigo: string;
  pais: string;
  alianza: string;
  activo: boolean;
};

const GestionAerolíneas = () => {
  const [aerolineas, setAerolineas] = useState<Aerolinea[]>([
    { id: 1, nombre: "Aerolínea A", codigo: "AA", pais: "Estados Unidos", alianza: "Oneworld", activo: true },
    { id: 2, nombre: "Aerolínea B", codigo: "AF", pais: "Francia", alianza: "SkyTeam", activo: true },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<Aerolinea>>({});

  const agregarAerolínea = (nuevaAerolínea: Omit<Aerolinea, "id">) => {
    setAerolineas([...aerolineas, { id: Date.now(), ...nuevaAerolínea }]);
  };

  const editarAerolínea = (id: number, datosActualizados: Partial<Aerolinea>) => {
    setAerolineas(aerolineas.map((a) => (a.id === id ? { ...a, ...datosActualizados } : a)));
  };

  const eliminarAerolínea = (id: number) => {
    setAerolineas(aerolineas.filter((a) => a.id !== id));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Aerolíneas</h2>
      <p className="gestion-descripcion">
        Gestiona la información de las aerolíneas registradas, incluyendo sus códigos, países de origen, alianzas y permisos de operación.
      </p>
      <div className="tarjetas-container">
        {aerolineas.map((aerolinea) => (
          <div key={aerolinea.id} className="tarjeta">
            {editandoId === aerolinea.id ? (
              <div>
                <input
                  type="text"
                  value={datosEditados.nombre || aerolinea.nombre}
                  onChange={(e) => setDatosEditados({ ...datosEditados, nombre: e.target.value })}
                  placeholder="Nuevo nombre"
                />
                <input
                  type="text"
                  value={datosEditados.codigo || aerolinea.codigo}
                  onChange={(e) => setDatosEditados({ ...datosEditados, codigo: e.target.value })}
                  placeholder="Código de aerolínea"
                />
                <input
                  type="text"
                  value={datosEditados.pais || aerolinea.pais}
                  onChange={(e) => setDatosEditados({ ...datosEditados, pais: e.target.value })}
                  placeholder="País de origen"
                />
                <input
                  type="text"
                  value={datosEditados.alianza || aerolinea.alianza}
                  onChange={(e) => setDatosEditados({ ...datosEditados, alianza: e.target.value })}
                  placeholder="Alianza"
                />
                <button
                  onClick={() => {
                    editarAerolínea(aerolinea.id, datosEditados);
                    setEditandoId(null);
                    setDatosEditados({});
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>{aerolinea.nombre}</h3>
                <p>Código: {aerolinea.codigo}</p>
                <p>País: {aerolinea.pais}</p>
                <p>Alianza: {aerolinea.alianza}</p>
                <p>Estado: {aerolinea.activo ? "Operativo" : "No operativo"}</p>
                <button onClick={() => editarAerolínea(aerolinea.id, { activo: !aerolinea.activo })}>
                  {aerolinea.activo ? "Desactivar" : "Activar"}
                </button>
                <button onClick={() => eliminarAerolínea(aerolinea.id)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditandoId(aerolinea.id);
                    setDatosEditados(aerolinea);
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
          agregarAerolínea({ nombre: "Nueva Aerolínea", codigo: "NX", pais: "País Desconocido", alianza: "Ninguna", activo: true })
        }
      >
        Agregar Aerolínea
      </button>
    </div>
  );
};

export default GestionAerolíneas;