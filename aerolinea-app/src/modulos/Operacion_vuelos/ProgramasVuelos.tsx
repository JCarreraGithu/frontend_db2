import React, { useEffect, useState } from 'react';
import './ProgramasVuelos.css';

interface ProgramaVuelo {
  id_programa: number;
  numero_vuelo: number;
  fecha: string;
  duracion: number;
  id_aeropuerto_origen: number;
  estado: string;
}

const ProgramasVuelos: React.FC = () => {
  const [programas, setProgramas] = useState<ProgramaVuelo[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/programas-vuelo')
      .then(res => res.json())
      .then((data: any[][]) => {
        const programasFormateados: ProgramaVuelo[] = data.map((fila) => ({
          id_programa: fila[0],
          numero_vuelo: fila[1],
          fecha: fila[2],
          duracion: fila[3],
          id_aeropuerto_origen: fila[4],
          estado: fila[5],
        }));
        setProgramas(programasFormateados);
        setError('');
      })
      .catch((err) => {
        console.error('Error al obtener programas:', err);
        setError('Error al obtener los programas de vuelo.');
      });
  }, []);

  return (
    <div className="programas-wrapper">
      <h1>Programación de Vuelos</h1>

      {error && <div className="error">{error}</div>}

      <table className="programas-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Número Vuelo</th>
            <th>Fecha</th>
            <th>Duración (min)</th>
            <th>ID Origen</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {programas.map((prog) => (
            <tr key={prog.id_programa}>
              <td>{prog.id_programa}</td>
              <td>{prog.numero_vuelo}</td>
              <td>{new Date(prog.fecha).toLocaleDateString()}</td>
              <td>{prog.duracion}</td>
              <td>{prog.id_aeropuerto_origen}</td>
              <td>{prog.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramasVuelos;
