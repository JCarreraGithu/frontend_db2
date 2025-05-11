import './ReservasYVentas.css';
import { FaPlaneDeparture } from 'react-icons/fa';

const ComponenteReservasYVentas = () => {
  const opciones = [
    'Registrar una nueva reserva de vuelo (venta de boleto)',
    'Seleccionar asiento al momento de la reserva',
    'Registrar modalidad de venta (online o aeropuerto)',
    'Asociar pasaporte (y visa si es necesario) a la reserva',
    'Asociar portal de venta (si la venta fue online)',
    'Registrar equipajes asociados a una reserva',
    'Calcular cargos adicionales por equipaje facturado',
    'Registrar el proceso de check-in para una reserva',
    'Actualizar estado de la reserva (pendiente, confirmada, cancelada, etc.)',
    'Emitir factura relacionada a una reserva',
    'Registrar pagos (incluyendo detalles y método)',
    'Validar requisitos migratorios (visa) para vuelos internacionales',
    'Permitir la cancelación o modificación de una reserva',
    'Visualizar historial de reservas por usuario',
  ];

  return (
    <div className="reservas-container">
      <div className="reservas-box">
        <div className="reservas-title">
          <FaPlaneDeparture className="login-icon" />
          Reservas y Ventas
        </div>
        <p className="reservas-description">
          Gestiona todo el proceso de reservas y ventas desde un solo lugar.
        </p>
        <div className="reservas-grid">
          {opciones.map((opcion, index) => (
            <div key={index} className="reservas-card">
              {opcion}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponenteReservasYVentas;
