import './GestionInfraestructura.css';
import { useNavigate } from 'react-router-dom';

const GestionInfraestructura = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      titulo: 'Pistas',
      descripcion: 'Administra las pistas de aterrizaje y despegue. Incluye su disponibilidad, mantenimiento y señalización.',
      ruta: '/dashboard/requisitos/Pistas',
    },
   
  ];

  return (
    <div className="infraestructura-wrapper">
      <h2 className="infraestructura-titulo">Infraestructura Aeroportuaria</h2>
      <div className="infraestructura-grid">
        {opciones.map((opcion, idx) => (
          <div key={idx} className="tarjeta-infraestructura" onClick={() => navigate(opcion.ruta)}>
            <h3>{opcion.titulo}</h3>
            <p>{opcion.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionInfraestructura;