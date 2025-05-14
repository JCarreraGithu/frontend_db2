import { useState } from "react";


type HorarioVuelo = {
  id: number;
  aerolinea: string;
  numeroVuelo: string;
  origen: string;
  destino: string;
  horaSalida: string;
  horaLlegada: string;
  franjaHoraria: string;
  mantenimiento: boolean;
};

const GestionHorariosVuelo = () => {
  const [horarios, setHorarios] = useState<HorarioVuelo[]>([
    { id: 1, aerolinea: "Aerolínea A", numeroVuelo: "AA123", origen: "Ciudad A", destino: "Ciudad B", horaSalida: "10:00", horaLlegada: "12:30", franjaHoraria: "Mañana", mantenimiento: false },
    { id: 2, aerolinea: "Aerolínea B", numeroVuelo: "BB456", origen: "Ciudad C", destino: "Ciudad D", horaSalida: "15:00", horaLlegada: "18:00", franjaHoraria: "Tarde", mantenimiento: true },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<HorarioVuelo>>({});

  const agregarHorario = (nuevoHorario: Omit<HorarioVuelo, "id">) => {
    setHorarios([...horarios, { id: Date.now(), ...nuevoHorario }]);
  };

  const editarHorario = (id: number, datosActualizados: Partial<HorarioVuelo>) => {
    setHorarios(horarios.map((h) => (h.id === id ? { ...h, ...datosActualizados } : h)));
  };

  const eliminarHorario = (id: number) => {
    setHorarios(horarios.filter((h) => h.id !== id));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Horarios de Vuelo</h2>
      <p className="gestion-descripcion">
        Gestiona los horarios de salida y llegada, franjas horarias asignadas y ventanas de mantenimiento aeroportuario.
      </p>
      <div className="tarjetas-container">
        {horarios.map((horario) => (
          <div key={horario.id} className="tarjeta">
            {editandoId === horario.id ? (
              <div>
                <input
                  type="text"
                  value={datosEditados.aerolinea || horario.aerolinea}
                  onChange={(e) => setDatosEditados({ ...datosEditados, aerolinea: e.target.value })}
                  placeholder="Aerolínea"
                />
                <input
                  type="text"
                  value={datosEditados.numeroVuelo || horario.numeroVuelo}
                  onChange={(e) => setDatosEditados({ ...datosEditados, numeroVuelo: e.target.value })}
                  placeholder="Número de vuelo"
                />
                <input
                  type="text"
                  value={datosEditados.origen || horario.origen}
                  onChange={(e) => setDatosEditados({ ...datosEditados, origen: e.target.value })}
                  placeholder="Origen"
                />
                <input
                  type="text"
                  value={datosEditados.destino || horario.destino}
                  onChange={(e) => setDatosEditados({ ...datosEditados, destino: e.target.value })}
                  placeholder="Destino"
                />
                <input
                  type="time"
                  value={datosEditados.horaSalida || horario.horaSalida}
                  onChange={(e) => setDatosEditados({ ...datosEditados, horaSalida: e.target.value })}
                  placeholder="Hora de salida"
                />
                <input
                  type="time"
                  value={datosEditados.horaLlegada || horario.horaLlegada}
                  onChange={(e) => setDatosEditados({ ...datosEditados, horaLlegada: e.target.value })}
                  placeholder="Hora de llegada"
                />
                <select
                  value={datosEditados.franjaHoraria || horario.franjaHoraria}
                  onChange={(e) => setDatosEditados({ ...datosEditados, franjaHoraria: e.target.value })}
                >
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noche">Noche</option>
                </select>
                <label>
                  <input
                    type="checkbox"
                    checked={datosEditados.mantenimiento ?? horario.mantenimiento}
                    onChange={(e) => setDatosEditados({ ...datosEditados, mantenimiento: e.target.checked })}
                  />
                  Mantenimiento programado
                </label>
                <button
                  onClick={() => {
                    editarHorario(horario.id, datosEditados);
                    setEditandoId(null);
                    setDatosEditados({});
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>{horario.aerolinea}</h3>
                <p>Número de vuelo: {horario.numeroVuelo}</p>
                <p>Origen: {horario.origen}</p>
                <p>Destino: {horario.destino}</p>
                <p>Hora de salida: {horario.horaSalida}</p>
                <p>Hora de llegada: {horario.horaLlegada}</p>
                <p>Franja horaria: {horario.franjaHoraria}</p>
                <p>Mantenimiento: {horario.mantenimiento ? "Programado" : "No programado"}</p>
                <button onClick={() => eliminarHorario(horario.id)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditandoId(horario.id);
                    setDatosEditados(horario);
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
          agregarHorario({ aerolinea: "Aerolínea C", numeroVuelo: "CC789", origen: "Madrid", destino: "Londres", horaSalida: "08:00", horaLlegada: "10:30", franjaHoraria: "Mañana", mantenimiento: false })
        }
      >
        Agregar Horario de Vuelo
      </button>
    </div>
  );
};

export default GestionHorariosVuelo;