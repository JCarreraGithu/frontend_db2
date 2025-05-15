import { useNavigate } from 'react-router-dom';
import './GestionOperaciones.css'; // Cambia el nombre del archivo CSS también

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
      ruta: '/dashboard/contribuyentes/Aerolineas',
    },
    {
      titulo: 'Aviones',
      descripcion: 'Controla la flota de aeronaves incluyendo su matrícula, modelo, capacidad y estado técnico para asegurar vuelos seguros.',
      ruta: '/dashboard/contribuyentes/Aviones',
    },
    {
      titulo: 'Programas de Vuelo',
      descripcion: 'Organiza los planes de vuelo de cada aerolínea, programaciones regulares y especiales con todos los detalles necesarios.',
      ruta: '/dashboard/contribuyentes/ProgramasVuelos',
    },
    {
      titulo: 'Vuelos',
      descripcion: 'Monitorea todos los vuelos programados, en curso o finalizados. Accede a su estado, itinerario, y asignaciones.',
      ruta: '/dashboard/contribuyentes/Vuelos',
    },
    {
      titulo: 'Horarios de Vuelo',
      descripcion: 'Gestiona los horarios de salida y llegada, franjas horarias asignadas y ventanas de mantenimiento aeroportuario.',
      ruta: '/dashboard/contribuyentes/HorariosVuelos',
    },
    {
      titulo: 'Escalas Técnicas',
      descripcion: 'Registra y supervisa las escalas técnicas que requieren mantenimiento, abastecimiento o inspección en vuelos de largo recorrido.',
      ruta: '/dashboard/contribuyentes/Escalas',
    },
  ];

  return (
    <div className="operaciones-wrapper">
      <h2 className="operaciones-titulo">Gestión de Operaciones de Vuelo</h2>
      <div className="operaciones-grid">
        {opciones.map((opcion, idx) => (
          <div
            key={idx}
            className="operaciones-tarjeta"
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
