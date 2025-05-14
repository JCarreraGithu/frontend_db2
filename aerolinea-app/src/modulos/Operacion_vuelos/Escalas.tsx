import { useState } from "react";

type EscalaTecnica = {
  id: number;
  aerolinea: string;
  numeroVuelo: string;
  aeropuerto: string;
  tipoEscala: "Mantenimiento" | "Abastecimiento" | "Inspección";
  estado: "Pendiente" | "En proceso" | "Completado";
  horaInicio: string;
  horaFin: string;
};

const GestionEscalasTecnicas = () => {
  const [escalas, setEscalas] = useState<EscalaTecnica[]>([
    { id: 1, aerolinea: "Aerolínea A", numeroVuelo: "AA123", aeropuerto: "JFK", tipoEscala: "Mantenimiento", estado: "Pendiente", horaInicio: "08:00", horaFin: "09:30" },
    { id: 2, aerolinea: "Aerolínea B", numeroVuelo: "BB456", aeropuerto: "CDG", tipoEscala: "Abastecimiento", estado: "En proceso", horaInicio: "14:00", horaFin: "15:00" },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<EscalaTecnica>>({});

  const agregarEscala = (nuevaEscala: Omit<EscalaTecnica, "id">) => {
    setEscalas([...escalas, { id: Date.now(), ...nuevaEscala }]);
  };

  const editarEscala = (id: number, datosActualizados: Partial<EscalaTecnica>) => {
    setEscalas(escalas.map((e) => (e.id === id ? { ...e, ...datosActualizados } : e)));
  };

  const eliminarEscala = (id: number) => {
    setEscalas(escalas.filter((e) => e.id !== id));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Escalas Técnicas</h2>
      <p className="gestion-descripcion">
        Registra y supervisa las escalas técnicas que requieren mantenimiento, abastecimiento o inspección en vuelos de largo recorrido.
      </p>
      <div className="tarjetas-container">
        {escalas.map((escala) => (
          <div key={escala.id} className="tarjeta">
            {editandoId === escala.id ? (
              <div>
                <input
                  type="text"
                  value={datosEditados.aerolinea || escala.aerolinea}
                  onChange={(e) => setDatosEditados({ ...datosEditados, aerolinea: e.target.value })}
                  placeholder="Aerolínea"
                />
                <input
                  type="text"
                  value={datosEditados.numeroVuelo || escala.numeroVuelo}
                  onChange={(e) => setDatosEditados({ ...datosEditados, numeroVuelo: e.target.value })}
                  placeholder="Número de vuelo"
                />
                <input
                  type="text"
                  value={datosEditados.aeropuerto || escala.aeropuerto}
                  onChange={(e) => setDatosEditados({ ...datosEditados, aeropuerto: e.target.value })}
                  placeholder="Aeropuerto"
                />
                <select
                  value={datosEditados.tipoEscala || escala.tipoEscala}
                  onChange={(e) => setDatosEditados({ ...datosEditados, tipoEscala: e.target.value as "Mantenimiento" | "Abastecimiento" | "Inspección" })}
                >
                  <option value="Mantenimiento">Mantenimiento</option>
                  <option value="Abastecimiento">Abastecimiento</option>
                  <option value="Inspección">Inspección</option>
                </select>
                <select
                  value={datosEditados.estado || escala.estado}
                  onChange={(e) => setDatosEditados({ ...datosEditados, estado: e.target.value as "Pendiente" | "En proceso" | "Completado" })}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Completado">Completado</option>
                </select>
                <input
                  type="time"
                  value={datosEditados.horaInicio || escala.horaInicio}
                  onChange={(e) => setDatosEditados({ ...datosEditados, horaInicio: e.target.value })}
                  placeholder="Hora de inicio"
                />
                <input
                  type="time"
                  value={datosEditados.horaFin || escala.horaFin}
                  onChange={(e) => setDatosEditados({ ...datosEditados, horaFin: e.target.value })}
                  placeholder="Hora de fin"
                />
                <button
                  onClick={() => {
                    editarEscala(escala.id, datosEditados);
                    setEditandoId(null);
                    setDatosEditados({});
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>{escala.aerolinea}</h3>
                <p>Número de vuelo: {escala.numeroVuelo}</p>
                <p>Aeropuerto: {escala.aeropuerto}</p>
                <p>Tipo de escala: {escala.tipoEscala}</p>
                <p>Estado: {escala.estado}</p>
                <p>Hora de inicio: {escala.horaInicio}</p>
                <p>Hora de fin: {escala.horaFin}</p>
                <button onClick={() => eliminarEscala(escala.id)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditandoId(escala.id);
                    setDatosEditados(escala);
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
          agregarEscala({ aerolinea: "Aerolínea C", numeroVuelo: "CC789", aeropuerto: "Madrid", tipoEscala: "Inspección", estado: "Pendiente", horaInicio: "06:00", horaFin: "07:30" })
        }
      >
        Agregar Escala Técnica
      </button>
    </div>
  );
};

export default GestionEscalasTecnicas;