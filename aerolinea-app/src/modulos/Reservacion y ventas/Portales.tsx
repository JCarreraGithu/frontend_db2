// src/components/Portales.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Portales.css';

interface Portal {
  id: number;
  nombre: string;
  url: string;
  activo: string; // "Y" o "N"
}

const Portales: React.FC = () => {
  const [portales, setPortales] = useState<Portal[]>([]);

  useEffect(() => {
    axios.get('http://192.168.195.61:3000/api/portales')
      .then(response => {
        const rawData: any[][] = response.data;
        const parsedData = rawData.map((p: any[]) => ({
          id: p[0],
          nombre: p[1],
          url: p[2],
          activo: p[3]
        }));
        setPortales(parsedData);
      })
      .catch(error => {
        console.error('Error al obtener los portales:', error);
      });
  }, []);

  return (
    <div className="portales-container">
      <div className="portales-card">
        <h3>Listado de Portales</h3>
        <table className="portales-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>URL</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            {portales.map((portal) => (
              <tr key={portal.id}>
                <td>{portal.id}</td>
                <td>{portal.nombre}</td>
                <td><a href={portal.url} target="_blank" rel="noopener noreferrer">{portal.url}</a></td>
                <td className={portal.activo === "Y" ? "activo" : "inactivo"}>
                  {portal.activo === "Y" ? "Sí" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portales;
