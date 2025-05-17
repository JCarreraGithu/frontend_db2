import { useEffect, useState } from "react";
import "./Visas.css";

type Visa = {
  id_visa: number;
  id_usuario: number;
  numero_visa: string;
  tipo_visa: string;
  fecha_emision: string;
  fecha_vencimiento: string;
  estado: string;
};

const Visas = () => {
  const [visas, setVisas] = useState<Visa[]>([]);
  const [nuevaVisa, setNuevaVisa] = useState({
    id_usuario: 0,
    numero_visa: "",
    tipo_visa: "turista",
    fecha_emision: "",
    fecha_vencimiento: "",
    estado: "pendiente",
  });
  const [busquedaID, setBusquedaID] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const limpiarMensaje = () => setTimeout(() => setMensaje(null), 3000);
  const limpiarError = () => setTimeout(() => setError(null), 3000);

  const obtenerVisas = () => {
    fetch("http://localhost:3000/api/visas")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setError("❌ Error: formato inesperado de la API");
          limpiarError();
          return;
        }

        const formateado = data.map((arr: any) => ({
          id_visa: arr[0],
          id_usuario: arr[1],
          numero_visa: arr[2],
          tipo_visa: arr[3],
          fecha_emision: new Date(arr[4]).toLocaleDateString("es-ES"),
          fecha_vencimiento: new Date(arr[5]).toLocaleDateString("es-ES"),
          estado: arr[6],
        }));

        setVisas(formateado);
      })
      .catch(() => {
        setError("❌ Error al cargar visas");
        limpiarError();
      });
  };

  useEffect(() => {
    obtenerVisas();
  }, []);

  const agregarVisa = () => {
    fetch("http://localhost:3000/api/visas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaVisa),
    })
      .then((res) => res.json())
      .then(() => {
        setMensaje("✅ Visa registrada exitosamente");
        setNuevaVisa({
          id_usuario: 0,
          numero_visa: "",
          tipo_visa: "turista",
          fecha_emision: "",
          fecha_vencimiento: "",
          estado: "pendiente",
        });
        obtenerVisas();
        limpiarMensaje();
      })
      .catch(() => {
        setError("❌ Error al registrar visa");
        limpiarError();
      });
  };

  const buscarPorID = () => {
    if (!busquedaID) {
      obtenerVisas();
      return;
    }

    fetch(`http://localhost:3000/api/visas/${busquedaID}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success || !data.data) {
          setError("❌ Visa no encontrada");
          limpiarError();
          return;
        }

        setVisas([{
          id_visa: data.data[0],
          id_usuario: data.data[1],
          numero_visa: data.data[2],
          tipo_visa: data.data[3],
          fecha_emision: new Date(data.data[4]).toLocaleDateString("es-ES"),
          fecha_vencimiento: new Date(data.data[5]).toLocaleDateString("es-ES"),
          estado: data.data[6],
        }]);
      })
      .catch(() => {
        setError("❌ Error al buscar visa");
        limpiarError();
      });
  };

  return (
    <div className="visas-wrapper">
      <h1>🛂 Gestión de Visas</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

      {/* FORMULARIO */}
      <div className="visas-card">
        <h3>➕ Registrar Visa</h3>

        <label htmlFor="id_usuario">ID Usuario</label>
        <input id="id_usuario" type="number" placeholder="Ejemplo: 22" value={nuevaVisa.id_usuario} onChange={(e) => setNuevaVisa({ ...nuevaVisa, id_usuario: Number(e.target.value) })} />

        <label htmlFor="numero_visa">Número de Visa</label>
        <input id="numero_visa" type="text" placeholder="Ejemplo: AB123456789" value={nuevaVisa.numero_visa} onChange={(e) => setNuevaVisa({ ...nuevaVisa, numero_visa: e.target.value })} />

        <label htmlFor="tipo_visa">Tipo de Visa</label>
        <select id="tipo_visa" value={nuevaVisa.tipo_visa} onChange={(e) => setNuevaVisa({ ...nuevaVisa, tipo_visa: e.target.value })}>
          <option value="turista">Turista</option>
          <option value="trabajo">Trabajo</option>
          <option value="estudiante">Estudiante</option>
          <option value="otros">Otros</option>
        </select>

        <label htmlFor="fecha_emision">Fecha de Emisión</label>
        <input id="fecha_emision" type="date" value={nuevaVisa.fecha_emision} onChange={(e) => setNuevaVisa({ ...nuevaVisa, fecha_emision: e.target.value })} />

        <label htmlFor="fecha_vencimiento">Fecha de Vencimiento</label>
        <input id="fecha_vencimiento" type="date" value={nuevaVisa.fecha_vencimiento} onChange={(e) => setNuevaVisa({ ...nuevaVisa, fecha_vencimiento: e.target.value })} />

        <button onClick={agregarVisa}>➕ Registrar</button>
        <button onClick={buscarPorID}>🔍 Buscar</button>
      </div>

      {/* TABLA DE VISAS */}
      <table className="visas-tabla">
        <thead>
          <tr>
            <th>ID Visa</th>
            <th>ID Usuario</th>
            <th>Número</th>
            <th>Tipo</th>
            <th>Fecha Emisión</th>
            <th>Fecha Vencimiento</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {visas.map((visa) => (
            <tr key={visa.id_visa}>
              <td>{visa.id_visa}</td>
              <td>{visa.id_usuario}</td>
              <td>{visa.numero_visa}</td>
              <td>{visa.tipo_visa}</td>
              <td>{visa.fecha_emision}</td>
              <td>{visa.fecha_vencimiento}</td>
              <td>{visa.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Visas;