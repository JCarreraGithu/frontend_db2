import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate(); // Hook para redirigir al login

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    // Eliminar datos de sesión (puedes agregar tu lógica de logout aquí)
    localStorage.removeItem('authToken'); // Ejemplo: Eliminando un token de sesión del localStorage
    console.log("Sesión cerrada");

    // Redirigir a la página de login
    navigate('/login'); // Esto redirige a la página de login

    setShowLogoutModal(false); // Cerrar el modal después de confirmar el logout
  };

  return (
    <div className="dashboard-container">
      {/* ENCABEZADO */}
      <div className="header-section">
        <div className="header-title">Bienvenido al Aeropuerto La Aurora</div>
        <p className="header-subtitle">Gestiona vuelos, usuarios y más desde esta plataforma</p>
      </div>

      {/* NAVBAR */}
      <div className="filter-bar">
      <NavLink to="/consultas-frecuentes" className="filter-item">Inicio</NavLink>
        <NavLink to="/dashboard/gestion-usuarios" className="filter-item">Gestión de Usuarios y Control de Identidad</NavLink>
        <NavLink to="/dashboard/contribuyentes" className="filter-item">Aeropuertos y Aerolíneas</NavLink>
        <NavLink to="/dashboard/Reservas" className="filter-item">Reservas y Ventas</NavLink>
        <NavLink to="/dashboard/mis-documentos" className="filter-item">Facturación y Pagos</NavLink>
        <NavLink to="/dashboard/requisitos" className="filter-item">Infraestructura Aeroportuaria</NavLink>
        <NavLink to="/dashboard/solicitudes-y-avisos" className="filter-item">Operaciones y Servicios</NavLink>
        <NavLink to="/dashboard/vehiculos" className="filter-item">Reportes y Simulación</NavLink>
      </div>

      {/* ÁREA DINÁMICA */}
      <div className="main-content">
        <Outlet />
      </div>

      {/* BOTÓN DE CERRAR SESIÓN */}
      <div className="logout-button-container">
        <button className="logout-button" onClick={handleLogoutClick}>Cerrar sesión</button>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      {showLogoutModal && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <p>¿Estás seguro de que quieres cerrar sesión?</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleCloseModal}>Cancelar</button>
              <button className="confirm-btn" onClick={handleConfirmLogout}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
