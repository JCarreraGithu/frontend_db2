import '../Gestion_Usuarios/GestionUsuarios.css';
import { useNavigate } from 'react-router-dom';

const GestionInfraestructura = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      titulo: 'Pistas',
      descripcion: 'Administra las pistas de aterrizaje y despegue. Incluye su disponibilidad, mantenimiento y señalización.',
      ruta: '/infraestructura/pistas',
    },
    {
      titulo: 'Mantenimiento de Pistas',
      descripcion: 'Controla los trabajos de mantenimiento programado o emergente en pistas y zonas de rodaje.',
      ruta: '/infraestructura/mantenimiento-pistas',
    },
    {
      titulo: 'Carros',
      descripcion: 'Gestión de vehículos operativos dentro del aeropuerto: logística, asignaciones y mantenimiento.',
      ruta: '/infraestructura/carros',
    },
    {
      titulo: 'Transporte',
      descripcion: 'Administra los medios de transporte internos y externos: autobuses, pasarelas y trenes aeroportuarios.',
      ruta: '/infraestructura/transporte',
    },
  ];

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Infraestructura Aeroportuaria</h2>
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

export default GestionInfraestructura;
