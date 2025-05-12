// src/pages/GestionUsuarios.jsx
import './GestionUsuarios.css';
import { useNavigate } from 'react-router-dom';

const GestionUsuarios = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      titulo: 'Usuarios',
      descripcion: 'Gestiona los datos personales, roles y estados de todos los usuarios del sistema. Puedes crear, editar, desactivar o eliminar usuarios según el perfil de acceso.',
      ruta: '/usuarios/crear',
    },
    {
      titulo: 'Visas',
      descripcion: 'Registra y controla las visas otorgadas a pasajeros, personal o visitantes, asegurando el cumplimiento de los requisitos migratorios para vuelos internacionales.',
      ruta: '/usuarios/listar',
    },
    {
      titulo: 'Cuentas',
      descripcion: 'Administra las cuentas vinculadas a usuarios: credenciales de acceso, seguridad, recuperación de contraseñas y configuración de doble autenticación si aplica.',
      ruta: '/usuarios/roles',
    },
    {
      titulo: 'Licencias',
      descripcion: 'Controla las licencias asociadas al personal operativo del aeropuerto (pilotos, técnicos, operadores, etc.). Asegura que las certificaciones estén vigentes y asociadas a los usuarios correspondientes.',
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
