import './GestionOperacionesServicios.css';
import { useNavigate } from 'react-router-dom';

const GestionOperacionesServicios = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      titulo: 'Mantenimiento',
      descripcion: 'Gestión y supervisión de trabajos de mantenimiento en el aeropuerto.',
      ruta: '/dashboard/solicitudes-y-avisos/mantenimiento',
    },
    
    
    {
      titulo: 'Arrestos',
      descripcion: 'Registro y control de personas detenidas dentro del aeropuerto.',
      ruta: '/dashboard/solicitudes-y-avisos/arrestos',
    },
    {
      titulo: 'Objetos Perdidos',
      descripcion: 'Administración de objetos perdidos y recuperados por los usuarios.',
      ruta: '/dashboard/solicitudes-y-avisos/objetos_perdidos',
    },
  ];

  return (
    <div className="ops-wrapper">
      <h2 className="ops-titulo">Operaciones y Servicios</h2>
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