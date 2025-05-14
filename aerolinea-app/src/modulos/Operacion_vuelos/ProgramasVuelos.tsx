import { useState } from "react";

type ProgramaVuelo = {
  id: number;
  aerolinea: string;
  destino: string;
  frecuencia: string;
  tipoVuelo: "Regular" | "Especial";
};

const GestionProgramasVuelo = () => {
  const [programasVuelo, setProgramasVuelo] = useState<ProgramaVuelo[]>([
    { id: 1, aerolinea: "Aerolínea A", destino: "Nueva York", frecuencia: "Diario", tipoVuelo: "Regular" },
    { id: 2, aerolinea: "Aerolínea B", destino: "París", frecuencia: "Semanal", tipoVuelo: "Especial" },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<ProgramaVuelo>>({});

  const agregarPrograma = (nuevoPrograma: Omit<ProgramaVuelo, "id">) => {
    setProgramasVuelo([...programasVuelo, { id: Date.now(), ...nuevoPrograma }]);
  };

  const editarPrograma = (id: number, datosActualizados: Partial<ProgramaVuelo>) => {
    setProgramasVuelo(programasVuelo.map((p) => (p.id === id ? { ...p, ...datosActualizados } : p)));
  };

  const eliminarPrograma = (id: number) => {
    setProgramasVuelo(programasVuelo.filter((p) => p.id !== id));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Programas de Vuelo</h2>
      <p className="gestion-descripcion">
        Organiza los planes de vuelo de cada aerolínea, programaciones regulares y especiales con todos los detalles necesarios.
      </p>
      <div className="tarjetas-container">
        {programasVuelo.map((programa) => (
          <div key={programa.id} className="tarjeta">
            {editandoId === programa.id ? (
              <div>
                <input
                  type="text"
                  value={datosEditados.aerolinea || programa.aerolinea}
                  onChange={(e) => setDatosEditados({ ...datosEditados, aerolinea: e.target.value })}
                  placeholder="Aerolínea"
                />
                <input
                  type="text"
                  value={datosEditados.destino || programa.destino}
                  onChange={(e) => setDatosEditados({ ...datosEditados, destino: e.target.value })}
                  placeholder="Destino"
                />
                <input
                  type="text"
                  value={datosEditados.frecuencia || programa.frecuencia}
                  onChange={(e) => setDatosEditados({ ...datosEditados, frecuencia: e.target.value })}
                  placeholder="Frecuencia"
                />
                <select
                  value={datosEditados.tipoVuelo || programa.tipoVuelo}
                  onChange={(e) => setDatosEditados({ ...datosEditados, tipoVuelo: e.target.value as "Regular" | "Especial" })}
                >
                  <option value="Regular">Regular</option>
                  <option value="Especial">Especial</option>
                </select>
                <button
                  onClick={() => {
                    editarPrograma(programa.id, datosEditados);
                    setEditandoId(null);
                    setDatosEditados({});
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>{programa.aerolinea}</h3>
                <p>Destino: {programa.destino}</p>
                <p>Frecuencia: {programa.frecuencia}</p>
                <p>Tipo de vuelo: {programa.tipoVuelo}</p>
                <button onClick={() => eliminarPrograma(programa.id)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditandoId(programa.id);
                    setDatosEditados(programa);
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
          agregarPrograma({ aerolinea: "Aerolínea C", destino: "Tokio", frecuencia: "Mensual", tipoVuelo: "Especial" })
        }
      >
        Agregar Programa de Vuelo
      </button>
    </div>
  );
};

export default GestionProgramasVuelo;