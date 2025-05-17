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
      ruta: 'dashboard/gestion_usuarios/usuarios/usuarios',
    },
    {
      titulo: 'Visas',
      descripcion:
        'Registra y controla las visas otorgadas a pasajeros, personal o visitantes.',
      ruta: '/usuarios/listar',
    },
    {
      titulo: 'Cuentas',
      descripcion:
        'Administra las cuentas, credenciales, y opciones de seguridad de acceso.',
      ruta: '/usuarios/roles',
    },
    {
      titulo: 'Licencias',
      descripcion:
        'Controla las licencias y certificaciones del personal operativo.',
      ruta: '/usuarios/licencias',
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
