import { useState } from "react";

type ObjetoPerdido = {
  id_objeto: number;
  descripcion: string;
  fecha_encontrado: Date;
  estado: "Sin reclamar" | "Reclamado" | "En revisión";
};

const GestionObjetosPerdidos = () => {
  const [objetos, setObjetos] = useState<ObjetoPerdido[]>([
    { id_objeto: 1, descripcion: "Maleta negra con etiquetas", fecha_encontrado: new Date(), estado: "Sin reclamar" },
    { id_objeto: 2, descripcion: "Teléfono móvil Samsung", fecha_encontrado: new Date(), estado: "En revisión" },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<ObjetoPerdido>>({});

  const agregarObjeto = (nuevoObjeto: Omit<ObjetoPerdido, "id_objeto">) => {
    setObjetos([...objetos, { id_objeto: Date.now(), ...nuevoObjeto }]);
  };

  const editarObjeto = (id_objeto: number, datosActualizados: Partial<ObjetoPerdido>) => {
    setObjetos(objetos.map((o) => (o.id_objeto === id_objeto ? { ...o, ...datosActualizados } : o)));
  };

  const eliminarObjeto = (id_objeto: number) => {
    setObjetos(objetos.filter((o) => o.id_objeto !== id_objeto));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Gestión de Objetos Perdidos</h2>
      <p className="gestion-descripcion">
        Administra el registro y seguimiento de los objetos perdidos en el aeropuerto.
      </p>
      <div className="tarjetas-container">
        {objetos.map((objeto) => (
          <div key={objeto.id_objeto} className="tarjeta">
            {editandoId === objeto.id_objeto ? (
              <div>
                <input
                  type="text"
                  value={datosEditados.descripcion || objeto.descripcion}
                  onChange={(e) => setDatosEditados({ ...datosEditados, descripcion: e.target.value })}
                  placeholder="Descripción del objeto"
                />
                <input
                  type="date"
                  value={datosEditados.fecha_encontrado?.toISOString().split("T")[0] || objeto.fecha_encontrado.toISOString().split("T")[0]}
                  onChange={(e) => setDatosEditados({ ...datosEditados, fecha_encontrado: new Date(e.target.value) })}
                  placeholder="Fecha encontrado"
                />
                <select
                  value={datosEditados.estado || objeto.estado}
                  onChange={(e) => setDatosEditados({ ...datosEditados, estado: e.target.value as ObjetoPerdido["estado"] })}
                >
                  <option value="Sin reclamar">Sin reclamar</option>
                  <option value="Reclamado">Reclamado</option>
                  <option value="En revisión">En revisión</option>
                </select>
                <button
                  onClick={() => {
                    editarObjeto(objeto.id_objeto, datosEditados);
                    setEditandoId(null);
                    setDatosEditados({});
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>Objeto {objeto.id_objeto}</h3>
                <p>Descripción: {objeto.descripcion}</p>
                <p>Fecha encontrado: {objeto.fecha_encontrado.toLocaleDateString()}</p>
                <p>Estado: {objeto.estado}</p>
                <button onClick={() => eliminarObjeto(objeto.id_objeto)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditandoId(objeto.id_objeto);
                    setDatosEditados(objeto);
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
          agregarObjeto({ descripcion: "Nuevo objeto encontrado", fecha_encontrado: new Date(), estado: "Sin reclamar" })
        }
      >
        Agregar Objeto
      </button>
    </div>
  );
};

export default GestionObjetosPerdidos;