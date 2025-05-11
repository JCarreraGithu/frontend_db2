import { useEffect, useState } from 'react';
import { getAllReservas } from '../../services/reservasService';

const HistorialReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    getAllReservas().then(setReservas).catch(console.error);
  }, []);

  return (
    <div>
      <h4>Historial de Reservas</h4>
      <ul>
        {reservas.map((r: any) => (
          <li key={r.ID_RESERVA}>Vuelo {r.ID_VUELO} - Estado: {r.ESTADO_RESERVA}</li>
        ))}
      </ul>
    </div>
  );
};

export default HistorialReservas;
