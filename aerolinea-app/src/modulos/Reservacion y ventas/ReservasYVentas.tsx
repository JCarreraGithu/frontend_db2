import '../Gestion_Usuarios/GestionUsuarios.css';
import { useNavigate } from 'react-router-dom';

const GestionReservasVentas = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      titulo: 'Reservas',
      descripcion: 'Administra las reservas de vuelos de pasajeros y carga, con opción de modificar, cancelar o confirmar según disponibilidad.',
      ruta: '/reservas/reservas',
    },
    {
      titulo: 'Equipajes',
      descripcion: 'Gestiona el control de equipajes desde el check-in hasta el destino final. Incluye seguimiento de objetos extraviados.',
      ruta: '/reservas/equipajes',
    },
    {
      titulo: 'Portales',
      descripcion: 'Configura y supervisa los portales digitales para reservas, compras y consultas en línea.',
      ruta: '/reservas/portales',
    },
    {
      titulo: 'Check-In',
      descripcion: 'Gestiona el proceso de registro previo al vuelo: asignación de asientos, impresión de pases de abordar y verificación de documentos.',
      ruta: '/reservas/checkin',
    },
  ];

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Gestión de Reservas y Ventas</h2>
      <div className="tarjetas-container">
        {opciones.map((opcion, idx) => (
          <div key={idx} className="tarjeta" onClick={() => navigate(opcion.ruta)}>
            <h3>{opcion.titulo}</h3>
            <p>{opcion.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionReservasVentas;
