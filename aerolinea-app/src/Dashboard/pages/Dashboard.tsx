import { Outlet, NavLink } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* ENCABEZADO */}
      <div className="header-section">
        <div className="header-title">Bienvenido al Aeropuerto La Aurora</div>
        <p className="header-subtitle">Gestiona vuelos, usuarios y más desde esta plataforma</p>
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <ul className="navbar-list">
          <li><NavLink to="gestion-usuarios" className="navbar-link">Gestión de Usuarios y Control de Identidad</NavLink></li>
          <li><NavLink to="aeropuertos-aerolineas" className="navbar-link">Operaciones de Vuelo</NavLink></li>
          <li><NavLink to="reservas" className="navbar-link">Reservas y Ventas</NavLink></li>
          <li><NavLink to="facturacion" className="navbar-link">Facturación y Pagos</NavLink></li>
          <li><NavLink to="infraestructura" className="navbar-link">Infraestructura Aeroportuaria</NavLink></li>
          <li><NavLink to="servicios" className="navbar-link">Operaciones y Servicios</NavLink></li>
          <li><NavLink to="reportes" className="navbar-link">Reportes y Simulación</NavLink></li>
        </ul>
      </nav>

      {/* ÁREA DINÁMICA */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
