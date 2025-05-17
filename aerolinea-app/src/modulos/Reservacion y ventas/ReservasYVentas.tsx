import './GestionReservasVentas.css'; // Asegúrate de tener este archivo
import { useNavigate } from 'react-router-dom';

const GestionReservasVentas = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      titulo: 'Reservas',
      descripcion: 'Administra las reservas de vuelos de pasajeros y carga, con opción de modificar, cancelar o confirmar según disponibilidad.',
      ruta: '/dashboard/reservas/reservas',
    },
    {
      titulo: 'Equipajes',
      descripcion: 'Gestiona el control de equipajes desde el check-in hasta el destino final. Incluye seguimiento de objetos extraviados.',
      ruta: '/dashboard/reservas/equipajes',
    },
    {
      titulo: 'Portales',
      descripcion: 'Configura y supervisa los portales digitales para reservas, compras y consultas en línea.',
      ruta: '/dashboard/reservas/portales',
    },
   
  ];

  return (
    <div className="reservas-wrapper">
      <h2 className="reservas-titulo">Gestión de Reservas y Ventas</h2>
      <div className="reservas-grid">
        {opciones.map((opcion, idx) => (
          <div
            key={idx}
            className="tarjeta-reserva"
            onClick={() => navigate(opcion.ruta)}
          >
            <h3>{opcion.titulo}</h3>
            <p>{opcion.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionReservasVentas;
