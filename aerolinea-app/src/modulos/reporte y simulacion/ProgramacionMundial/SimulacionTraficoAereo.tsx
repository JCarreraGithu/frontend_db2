

import { useState } from "react";
import "./Estilo.css"; // Asegúrate de tener este archivo de estilos


type SimulacionTraficoAereo = {
  id_simulacion: number;
  id_vuelo: number;
  condiciones_climaticas: string;
  trafico_estimado: number;
  impacto_operacional: string;
};

const GestionSimulacionTraficoAereo = () => {
  const [simulaciones, setSimulaciones] = useState<SimulacionTraficoAereo[]>([
    { id_simulacion: 1, id_vuelo: 501, condiciones_climaticas: "Cielo despejado, viento leve", trafico_estimado: 75, impacto_operacional: "Sin cambios" },
    { id_simulacion: 2, id_vuelo: 502, condiciones_climaticas: "Tormenta eléctrica en ruta", trafico_estimado: 30, impacto_operacional: "Posible retraso" },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<SimulacionTraficoAereo>>({});

  const agregarSimulacion = (nuevaSimulacion: Omit<SimulacionTraficoAereo, "id_simulacion">) => {
    setSimulaciones([...simulaciones, { id_simulacion: Date.now(), ...nuevaSimulacion }]);
  };

  const editarSimulacion = (id_simulacion: number, datosActualizados: Partial<SimulacionTraficoAereo>) => {
    setSimulaciones(
      simulaciones.map((s) => (s.id_simulacion === id_simulacion ? { ...s, ...datosActualizados } : s))
    );
  };

  const eliminarSimulacion = (id_simulacion: number) => {
    setSimulaciones(simulaciones.filter((s) => s.id_simulacion !== id_simulacion));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Gestión de Simulación de Tráfico Aéreo</h2>
      <p className="gestion-descripcion">
        Administra la simulación del tráfico aéreo considerando condiciones climáticas y operacionales.
      </p>
      <div className="tarjetas-container">
        {simulaciones.map((simulacion) => (
          <div key={simulacion.id_simulacion} className="tarjeta">
            {editandoId === simulacion.id_simulacion ? (
              <div>
                <input
                  type="number"
                  value={datosEditados.id_vuelo || simulacion.id_vuelo}
                  onChange={(e) => setDatosEditados({ ...datosEditados, id_vuelo: Number(e.target.value) })}
                  placeholder="ID Vuelo"
                />
                <input
                  type="text"
                  value={datosEditados.condiciones_climaticas || simulacion.condiciones_climaticas}
                  onChange={(e) => setDatosEditados({ ...datosEditados, condiciones_climaticas: e.target.value })}
                  placeholder="Condiciones climáticas"
                />
                <input
                  type="number"
                  value={datosEditados.trafico_estimado || simulacion.trafico_estimado}
                  onChange={(e) => setDatosEditados({ ...datosEditados, trafico_estimado: Number(e.target.value) })}
                  placeholder="Trafico estimado (%)"
                />
                <input
                  type="text"
                  value={datosEditados.impacto_operacional || simulacion.impacto_operacional}
                  onChange={(e) => setDatosEditados({ ...datosEditados, impacto_operacional: e.target.value })}
                  placeholder="Impacto operacional"
                />
                <button
                  onClick={() => {
                    editarSimulacion(simulacion.id_simulacion, datosEditados);
                    setEditandoId(null);
                    setDatosEditados({});
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>Simulación {simulacion.id_simulacion}</h3>
                <p>ID Vuelo: {simulacion.id_vuelo}</p>
                <p>Condiciones climáticas: {simulacion.condiciones_climaticas}</p>
                <p>Tráfico estimado: {simulacion.trafico_estimado}%</p>
                <p>Impacto operacional: {simulacion.impacto_operacional}</p>
                <button onClick={() => eliminarSimulacion(simulacion.id_simulacion)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditandoId(simulacion.id_simulacion);
                    setDatosEditados(simulacion);
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
          agregarSimulacion({ id_vuelo: 503, condiciones_climaticas: "Niebla densa en aeródromo", trafico_estimado: 50, impacto_operacional: "Demora en aterrizaje" })
        }
      >
        Agregar Simulación
      </button>
    </div>
  );
};

export default GestionSimulacionTraficoAereo;

