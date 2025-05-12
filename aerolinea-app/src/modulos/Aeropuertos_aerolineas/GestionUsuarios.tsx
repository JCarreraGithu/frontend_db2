// src/pages/GestionUsuarios.jsx
import './GestionUsuarios.css';
import { useNavigate } from 'react-router-dom';

const GestionUsuarios = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      titulo: 'Crear Usuario',
      descripcion: 'Registra un nuevo usuario en el sistema.',
      ruta: '/usuarios/crear',
    },
    {
      titulo: 'Listar Usuarios',
      descripcion: 'Consulta, edita o elimina usuarios existentes.',
      ruta: '/usuarios/listar',
    },
    {
      titulo: 'Roles y Permisos',
      descripcion: 'Gestiona los roles asignados a los usuarios.',
      ruta: '/usuarios/roles',
    },
  ];

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Gestión de Usuarios y Control de Identidad</h2>
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

export default GestionUsuarios;
