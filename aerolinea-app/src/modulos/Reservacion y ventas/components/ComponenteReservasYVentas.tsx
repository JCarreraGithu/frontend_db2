import FormularioReservasYVentas from './FormularioReservasYVentas';
import HistorialReservas from './HistorialReservas';

const ComponenteReservasYVentas = () => {
  return (
    <div className="reservas-ventas-container">
      <h2>Gestión de Reservas y Ventas</h2>
      <FormularioReservasYVentas />
      <HistorialReservas />
    </div>
  );
};

export default ComponenteReservasYVentas;
