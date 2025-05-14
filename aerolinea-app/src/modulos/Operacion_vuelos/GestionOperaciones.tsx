import '../Gestion_Usuarios/GestionUsuarios.css';
import { useNavigate } from 'react-router-dom';

const GestionOperaciones = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      titulo: 'Aeropuertos',
      descripcion: 'Administra los aeropuertos disponibles para operaciones nacionales e internacionales. Puedes agregar nuevos, editar detalles o eliminar aeropuertos no operativos.',
      ruta: '/dashboard/contribuyentes/Aeropuertos',
    },
    {
      titulo: 'Aerolíneas',
      descripcion: 'Gestiona la información de las aerolíneas registradas, incluyendo sus códigos, países de origen, alianzas y permisos de operación.',
      ruta: '/operaciones/aerolineas',
    },
    {
      titulo: 'Aviones',
      descripcion: 'Controla la flota de aeronaves incluyendo su matrícula, modelo, capacidad y estado técnico para asegurar vuelos seguros.',
      ruta: '/operaciones/aviones',
    },
    {
      titulo: 'Programas de Vuelo',
      descripcion: 'Organiza los planes de vuelo de cada aerolínea, programaciones regulares y especiales con todos los detalles necesarios.',
      ruta: '/operaciones/programas-vuelo',
    },
    {
      titulo: 'Vuelos',
      descripcion: 'Monitorea todos los vuelos programados, en curso o finalizados. Accede a su estado, itinerario, y asignaciones.',
      ruta: '/operaciones/vuelos',
    },
    {
      titulo: 'Horarios de Vuelo',
      descripcion: 'Gestiona los horarios de salida y llegada, franjas horarias asignadas y ventanas de mantenimiento aeroportuario.',
      ruta: '/operaciones/horarios-vuelos',
    },
    {
      titulo: 'Escalas Técnicas',
      descripcion: 'Registra y supervisa las escalas técnicas que requieren mantenimiento, abastecimiento o inspección en vuelos de largo recorrido.',
      ruta: '/operaciones/escalas-tecnicas',
    },
  ];

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Gestión de Operaciones de Vuelo</h2>
      <div className="tarjetas-container">
        {opciones.map((opcion, idx) => (
          <div
            key={idx}
            className="tarjeta"
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

export default GestionOperaciones;
