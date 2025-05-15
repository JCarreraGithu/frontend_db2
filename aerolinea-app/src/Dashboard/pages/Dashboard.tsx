import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el nombre de usuario del localStorage
    const storedName = localStorage.getItem('username');
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Limpiar también el nombre
    console.log('Sesión cerrada');
    navigate('/login');
    setShowLogoutModal(false);
  };

  return (
    <div className="dashboard-container">
      {/* ENCABEZADO */}
      <div className="header-section">
        <div className="logout-top-right">
          <button className="logout-button" onClick={handleLogoutClick}>
            Cerrar sesión
          </button>
        </div>
        <div className="header-title">
          Bienvenido {username ? `  ${username}` : ''} al Aeropuerto La Aurora
        </div>
        <p className="header-subtitle">
          Gestiona vuelos, usuarios y más desde esta plataforma
        </p>
      </div>

      {/* NAVBAR */}
      <div className="filter-bar">
        <NavLink to="/consultas-frecuentes" className="filter-item">Inicio</NavLink>
        <NavLink to="/dashboard/gestion-usuarios" className="filter-item">Gestión de Usuarios y Control de Identidad</NavLink>
        <NavLink to="/dashboard/Contribuyentes" className="filter-item">Aeropuertos y Aerolíneas</NavLink>
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
