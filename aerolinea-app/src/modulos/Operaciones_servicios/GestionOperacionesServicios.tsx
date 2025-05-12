import '../Gestion_Usuarios/GestionUsuarios.css';
import { useNavigate } from 'react-router-dom';

const GestionOperacionesServicios = () => {
  const navigate = useNavigate();

  const opciones = [
    { titulo: 'Mantenimiento', descripcion: 'Gestión del mantenimiento general del aeropuerto: instalaciones, equipos y servicios.', ruta: '/servicios/mantenimiento' },
    { titulo: 'Operaciones Terrestres', descripcion: 'Supervisión de las operaciones terrestres: embarque, equipaje, asistencia a aeronaves.', ruta: '/servicios/operaciones-terrestres' },
    { titulo: 'Operaciones Aéreas', descripcion: 'Control de operaciones aéreas en pista, torre de control y coordinación con pilotos.', ruta: '/servicios/operaciones-aereas' },
    { titulo: 'Personal', descripcion: 'Gestión del personal operativo, roles, turnos, certificaciones y asistencia.', ruta: '/servicios/personal' },
    { titulo: 'Arrestos', descripcion: 'Registro y manejo de incidentes legales o de seguridad que implican arrestos dentro del aeropuerto.', ruta: '/servicios/arrestos' },
    { titulo: 'Objetos Perdidos', descripcion: 'Control de objetos extraviados, reclamaciones, almacenamiento y devoluciones.', ruta: '/servicios/objetos-perdidos' },
  ];

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Operaciones y Servicios</h2>
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

export default GestionOperacionesServicios;
