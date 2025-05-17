// src/pages/GestionUsuarios.jsx
import './GestionUsuarios.css';
import { useNavigate } from 'react-router-dom';

const GestionUsuarios = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      titulo: 'Usuarios',
      descripcion:
        'Gestiona los datos personales, roles y estados de todos los usuarios del sistema.',
      ruta: '/dashboard/gestion-usuarios/usuarios',
    },
    {
      titulo: 'Visas',
      descripcion:
        'Registra y controla las visas otorgadas a pasajeros, personal o visitantes.',
      ruta: '/dashboard/gestion-usuarios/Visas',
    },
   
    {
      titulo: 'Licencias',
      descripcion:
        'Controla las licencias y certificaciones del personal operativo.',
      ruta: '/dashboard/gestion-usuarios/Licencias',
    },
  ];

  return (
    <div className="gestion-wrapper">
      <h2 className="gestion-titulo">Gestión de Usuarios y Control de Identidad</h2>
      <div className="tarjetas-grid">
        {opciones.map((opcion, idx) => (
          <div
            key={idx}
            className="tarjeta-glass"
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

export default GestionUsuarios;
