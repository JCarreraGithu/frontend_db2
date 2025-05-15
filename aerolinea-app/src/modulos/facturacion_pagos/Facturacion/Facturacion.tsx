import { useState } from "react";

type Factura = {
  id_factura: number;
  id_reserva: number;
  monto: number;
  fecha_factura: Date;
};

const GestionFacturacion = () => {
  const [facturas, setFacturas] = useState<Factura[]>([
    { id_factura: 1, id_reserva: 101, monto: 250, fecha_factura: new Date() },
    { id_factura: 2, id_reserva: 102, monto: 400, fecha_factura: new Date() },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEditados, setDatosEditados] = useState<Partial<Factura>>({});

  const agregarFactura = (nuevaFactura: Omit<Factura, "id_factura">) => {
    setFacturas([...facturas, { id_factura: Date.now(), ...nuevaFactura }]);
  };

  const editarFactura = (id_factura: number, datosActualizados: Partial<Factura>) => {
    setFacturas(facturas.map((f) => (f.id_factura === id_factura ? { ...f, ...datosActualizados } : f)));
  };

  const eliminarFactura = (id_factura: number) => {
    setFacturas(facturas.filter((f) => f.id_factura !== id_factura));
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Facturación</h2>
      <p className="gestion-descripcion">
        Gestiona la información de las facturas generadas en las reservas y otros servicios.
      </p>
      <div className="tarjetas-container">
        {facturas.map((factura) => (
          <div key={factura.id_factura} className="tarjeta">
            {editandoId === factura.id_factura ? (
              <div>
                <input
                  type="number"
                  value={datosEditados.id_reserva || factura.id_reserva}
                  onChange={(e) => setDatosEditados({ ...datosEditados, id_reserva: Number(e.target.value) })}
                  placeholder="ID Reserva"
                />
                <input
                  type="number"
                  value={datosEditados.monto || factura.monto}
                  onChange={(e) => setDatosEditados({ ...datosEditados, monto: Number(e.target.value) })}
                  placeholder="Monto"
                />
                <button
                  onClick={() => {
                    editarFactura(factura.id_factura, datosEditados);
                    setEditandoId(null);
                    setDatosEditados({});
                  }}
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h3>Factura {factura.id_factura}</h3>
                <p>ID Reserva: {factura.id_reserva}</p>
                <p>Monto: {factura.monto}</p>
                <p>Fecha: {factura.fecha_factura.toLocaleDateString()}</p>
                <button onClick={() => eliminarFactura(factura.id_factura)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditandoId(factura.id_factura);
                    setDatosEditados(factura);
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
          agregarFactura({ id_reserva: 103, monto: 300, fecha_factura: new Date() })
        }
      >
        Agregar Factura
      </button>
    </div>
  );
};

export default GestionFacturacion;