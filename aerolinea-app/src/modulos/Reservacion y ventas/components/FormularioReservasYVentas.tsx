import { useState } from 'react';
import TablaVuelosDisponibles from './TablaVuelosDisponibles';
import FormularioEquipaje from './FormularioEquipaje';
import FormularioPago from './FormularioPago';
import ComprobanteReserva from './ComprobanteReserva';
import { crearReserva } from '../services/reservaService';

const FormularioReservasYVentas = () => {
  const [reserva, setReserva] = useState({
    id_usuario: '',
    id_vuelo: '',
    asiento: '',
    estado_reserva: 'pendiente',
    fecha_reserva: new Date().toISOString(),
    modalidad_venta: 'online',
    pasaporte: '',
    visa: '',
    portal: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await crearReserva(reserva);
      alert('Reserva creada correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al crear reserva');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TablaVuelosDisponibles setReserva={setReserva} />
      <FormularioEquipaje />
      <FormularioPago />
      <ComprobanteReserva reserva={reserva} />
      <button type="submit">Confirmar Reserva</button>
    </form>
  );
};

export default FormularioReservasYVentas;
