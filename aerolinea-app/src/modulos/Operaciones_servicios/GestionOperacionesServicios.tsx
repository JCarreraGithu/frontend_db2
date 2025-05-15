import './GestionOperacionesServicios.css';
import { useNavigate } from 'react-router-dom';

const GestionOperacionesServicios = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      titulo: 'Pistas',
      descripcion: 'Administra las pistas de aterrizaje y despegue. Incluye su disponibilidad, mantenimiento y señalización.',
      ruta: '/operaciones-servicios/pistas',
    },
    {
      titulo: 'Mantenimiento de Pistas',
      descripcion: 'Controla los trabajos de mantenimiento programado o emergente en pistas y zonas de rodaje.',
      ruta: '/operaciones-servicios/mantenimiento-pistas',
    },
    {
      titulo: 'Carros',
      descripcion: 'Gestión de vehículos operativos dentro del aeropuerto: logística, asignaciones y mantenimiento.',
      ruta: '/operaciones-servicios/carros',
    },
    {
      titulo: 'Transporte',
      descripcion: 'Administra los medios de transporte internos y externos: autobuses, pasarelas y trenes aeroportuarios.',
      ruta: '/operaciones-servicios/transporte',
    },
  ];

  return (
    <div className="ops-wrapper">
      <h2 className="ops-titulo">Operaciones y Servicios Aeroportuarios</h2>
      <div className="ops-grid">
        {opciones.map((opcion, idx) => (
          <div key={idx} className="tarjeta-ops" onClick={() => navigate(opcion.ruta)}>
            <h3>{opcion.titulo}</h3>
            <p>{opcion.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionOperacionesServicios;
