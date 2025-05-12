// src/pages/Dashboard.tsx
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
      <div className="filter-bar">
        <NavLink to="/consultas-frecuentes" className="filter-item">Gestión de Usuarios y Control de Identidad</NavLink>
        <NavLink to="/contribuyentes" className="filter-item">Aeropuertos y Aerolíneas</NavLink>
        <NavLink to="/Reservas" className="filter-item">Reservas y Ventas</NavLink>
        <NavLink to="/mis-documentos" className="filter-item">Facturación y Pagos</NavLink>
        <NavLink to="/requisitos" className="filter-item">Infraestructura Aeroportuaria</NavLink>
        <NavLink to="/solicitudes-y-avisos" className="filter-item">Operaciones y Servicios</NavLink>
        <NavLink to="/vehiculos" className="filter-item">Reportes y Simulación</NavLink>
      </div>

      {/* ÁREA DINÁMICA */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
