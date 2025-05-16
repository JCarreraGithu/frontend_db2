import { useState } from "react";

type Carro = {
  id_carro: number;
  modelo: string;
  estado: "operativo" | "en mantenimiento" | "inactivo";
  descripcion: string;
};

const GestionCarros = () => {
  const [carros, setCarros] = useState<Carro[]>([
    { id_carro: 1, modelo: "Toyota Hilux", estado: "operativo", descripcion: "Vehículo para mantenimiento de pista" },
    { id_carro: 2, modelo: "Ford Transit", estado: "en mantenimiento", descripcion: "Transporte de equipo técnico" },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<Carro>>({});

  const agregarCarro = (nuevoCarro: Omit<Carro, "id_carro">) => {
    setCarros([...carros, { id_carro: Date.now(), ...nuevoCarro }]);
  };

  const editarCarro = (id_carro: number, datosActualizados: Partial<Carro>) => {
    setCarros(carros.map((c) => (c.id_carro === id_carro ? { ...c, ...datosActualizados } : c)));
  };

  const eliminarCarro = (id_carro: number) => {
    setCarros(carros.filter((c) => c.id_carro !== id_carro));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Gestión de Carros</h2>
      <p className="gestion-descripcion">
        Administra los vehículos de mantenimiento y servicio utilizados en el aeropuerto.
      </p>
      <div className="tarjetas-container">
        {carros.map((carro) => (
          <div key={carro.id_carro} className="tarjeta">
            {editandoId === carro.id_carro ? (
              <div>
                <input
                  type="text"
                  value={datosEditados.modelo || carro.modelo}
                  onChange={(e) => setDatosEditados({ ...datosEditados, modelo: e.target.value })}
                  placeholder="Modelo"
                />
                <select
                  value={datosEditados.estado || carro.estado}
                  onChange={(e) => setDatosEditados({ ...datosEditados, estado: e.target.value as Carro["estado"] })}
                >
                  <option value="operativo">Operativo</option>
                  <option value="en mantenimiento">En mantenimiento</option>
                  <option value="inactivo">Inactivo</option>
                </select>
                <input
                  type="text"
                  value={datosEditados.descripcion || carro.descripcion}
                  onChange={(e) => setDatosEditados({ ...datosEditados, descripcion: e.target.value })}
                  placeholder="Descripción"
                />
                <button
                  onClick={() => {
                    editarCarro(carro.id_carro, datosEditados);
                    setEditandoId(null);
                    setDatosEditados({});
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>{carro.modelo}</h3>
                <p>Estado: {carro.estado}</p>
                <p>Descripción: {carro.descripcion}</p>
                <button onClick={() => eliminarCarro(carro.id_carro)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditandoId(carro.id_carro);
                    setDatosEditados(carro);
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
          agregarCarro({ modelo: "Nuevo Vehículo", estado: "operativo", descripcion: "Vehículo de servicio" })
        }
      >
        Agregar Carro
      </button>
    </div>
  );
};

export default GestionCarros;