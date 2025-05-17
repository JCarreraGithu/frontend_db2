import React, { useEffect, useState } from "react";
import axios from "axios";
import './Estilo.css';

type ObjetoPerdido = {
  id: number;
  descripcion: string;
  fecha_encontrado: string;
  estado: string;
};

const ObjetosPerdidos: React.FC = () => {
  const [objetos, setObjetos] = useState<ObjetoPerdido[]>([]);
  const [form, setForm] = useState({
    descripcion: "",
    fecha_encontrado: "",
    estado: "Sin reclamar",
  });
  const [buscarId, setBuscarId] = useState("");
  const [resultadoBusqueda, setResultadoBusqueda] = useState<ObjetoPerdido | null>(null);

  const fetchObjetos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/objetos-perdidos");
      const data = res.data.map((row: any[]) => ({
        id: row[0],
        descripcion: row[1],
        fecha_encontrado: row[2],
        estado: row[3],
      }));
      setObjetos(data);
    } catch (error) {
      console.error("Error al obtener objetos perdidos:", error);
    }
  };

  useEffect(() => {
    fetchObjetos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/objetos-perdidos", form);
      setForm({ descripcion: "", fecha_encontrado: "", estado: "Sin reclamar" });
      fetchObjetos();
    } catch (error) {
      console.error("Error al insertar objeto perdido:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/objetos-perdidos/${id}`);
      fetchObjetos();
    } catch (error) {
      console.error("Error al eliminar objeto perdido:", error);
    }
  };

  const handleBuscarPorId = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/objetos-perdidos/${buscarId}`);
      const row = res.data;
      setResultadoBusqueda({
        id: row[0],
        descripcion: row[1],
        fecha_encontrado: row[2],
        estado: row[3],
      });
    } catch (error) {
      console.error("Error al buscar objeto por ID:", error);
      setResultadoBusqueda(null);
    }
  };

  return (
    <div className="objetos-wrapper">
      <h1>Objetos Perdidos</h1>

      <form onSubmit={handleSubmit} className="objetos-formulario">
        <input
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          required
        />
        <input
          name="fecha_encontrado"
          value={form.fecha_encontrado}
          onChange={handleChange}
          type="date"
          required
        />
        <select name="estado" value={form.estado} onChange={handleChange}>
          <option value="Sin reclamar">Sin reclamar</option>
          <option value="Reclamado">Reclamado</option>
        </select>
        <button type="submit">Registrar Objeto</button>
      </form>

      <div className="objetos-busqueda">
        <h2>Buscar por ID</h2>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <input
            type="number"
            value={buscarId}
            onChange={(e) => setBuscarId(e.target.value)}
            placeholder="ID del objeto"
          />
          <button onClick={handleBuscarPorId}>Buscar</button>
        </div>
        {resultadoBusqueda && (
          <div className="resultado-busqueda">
            <p><strong>ID:</strong> {resultadoBusqueda.id}</p>
            <p><strong>Descripción:</strong> {resultadoBusqueda.descripcion}</p>
            <p><strong>Fecha Encontrado:</strong> {new Date(resultadoBusqueda.fecha_encontrado).toLocaleDateString()}</p>
            <p><strong>Estado:</strong> {resultadoBusqueda.estado}</p>
          </div>
        )}
      </div>

      <div className="objetos-tabla-contenedor">
        <table className="tabla-objetos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Fecha Encontrado</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {objetos.map((obj) => (
              <tr key={obj.id}>
                <td>{obj.id}</td>
                <td>{obj.descripcion}</td>
                <td>{new Date(obj.fecha_encontrado).toLocaleDateString()}</td>
                <td>{obj.estado}</td>
                <td>
                  <button onClick={() => handleDelete(obj.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ObjetosPerdidos;
