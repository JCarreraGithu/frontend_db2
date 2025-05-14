import { useState } from "react";

type Vuelo = {
  id: number;
  aerolinea: string;
  numeroVuelo: string;
  origen: string;
  destino: string;
  estado: "Programado" | "En curso" | "Finalizado" | "Cancelado";
  horaSalida: string;
  horaLlegada: string;
};

const GestionVuelos = () => {
  const [vuelos, setVuelos] = useState<Vuelo[]>([
    { id: 1, aerolinea: "Aerolínea A", numeroVuelo: "AA123", origen: "Ciudad A", destino: "Ciudad B", estado: "Programado", horaSalida: "10:00", horaLlegada: "12:30" },
    { id: 2, aerolinea: "Aerolínea B", numeroVuelo: "BB456", origen: "Ciudad C", destino: "Ciudad D", estado: "En curso", horaSalida: "15:00", horaLlegada: "18:00" },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<Vuelo>>({});

  const agregarVuelo = (nuevoVuelo: Omit<Vuelo, "id">) => {
    setVuelos([...vuelos, { id: Date.now(), ...nuevoVuelo }]);
  };

  const editarVuelo = (id: number, datosActualizados: Partial<Vuelo>) => {
    setVuelos(vuelos.map((v) => (v.id === id ? { ...v, ...datosActualizados } : v)));
  };

  const eliminarVuelo = (id: number) => {
    setVuelos(vuelos.filter((v) => v.id !== id));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Vuelos</h2>
      <p className="gestion-descripcion">
        Monitorea todos los vuelos programados, en curso o finalizados. Accede a su estado, itinerario y asignaciones.
      </p>
      <div className="tarjetas-container">
        {vuelos.map((vuelo) => (
          <div key={vuelo.id} className="tarjeta">
            {editandoId === vuelo.id ? (
              <div>
                <input
                  type="text"
                  value={datosEditados.aerolinea || vuelo.aerolinea}
                  onChange={(e) => setDatosEditados({ ...datosEditados, aerolinea: e.target.value })}
                  placeholder="Aerolínea"
                />
                <input
                  type="text"
                  value={datosEditados.numeroVuelo || vuelo.numeroVuelo}
                  onChange={(e) => setDatosEditados({ ...datosEditados, numeroVuelo: e.target.value })}
                  placeholder="Número de vuelo"
                />
                <input
                  type="text"
                  value={datosEditados.origen || vuelo.origen}
                  onChange={(e) => setDatosEditados({ ...datosEditados, origen: e.target.value })}
                  placeholder="Origen"
                />
                <input
                  type="text"
                  value={datosEditados.destino || vuelo.destino}
                  onChange={(e) => setDatosEditados({ ...datosEditados, destino: e.target.value })}
                  placeholder="Destino"
                />
                <select
                  value={datosEditados.estado || vuelo.estado}
                  onChange={(e) => setDatosEditados({ ...datosEditados, estado: e.target.value as "Programado" | "En curso" | "Finalizado" | "Cancelado" })}
                >
                  <option value="Programado">Programado</option>
                  <option value="En curso">En curso</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
                <input
                  type="time"
                  value={datosEditados.horaSalida || vuelo.horaSalida}
                  onChange={(e) => setDatosEditados({ ...datosEditados, horaSalida: e.target.value })}
                  placeholder="Hora de salida"
                />
                <input
                  type="time"
                  value={datosEditados.horaLlegada || vuelo.horaLlegada}
                  onChange={(e) => setDatosEditados({ ...datosEditados, horaLlegada: e.target.value })}
                  placeholder="Hora de llegada"
                />
                <button
                  onClick={() => {
                    editarVuelo(vuelo.id, datosEditados);
                    setEditandoId(null);
                    setDatosEditados({});
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>{vuelo.aerolinea}</h3>
                <p>Número de vuelo: {vuelo.numeroVuelo}</p>
                <p>Origen: {vuelo.origen}</p>
                <p>Destino: {vuelo.destino}</p>
                <p>Estado: {vuelo.estado}</p>
                <p>Hora de salida: {vuelo.horaSalida}</p>
                <p>Hora de llegada: {vuelo.horaLlegada}</p>
                <button onClick={() => eliminarVuelo(vuelo.id)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditandoId(vuelo.id);
                    setDatosEditados(vuelo);
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
          agregarVuelo({ aerolinea: "Aerolínea C", numeroVuelo: "CC789", origen: "Madrid", destino: "Londres", estado: "Programado", horaSalida: "08:00", horaLlegada: "10:30" })
        }
      >
        Agregar Vuelo
      </button>
    </div>
  );
};

export default GestionVuelos;