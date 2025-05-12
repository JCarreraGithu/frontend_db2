import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../autenticacion/pages/login';
//import ComponenteReservasYVentas from '../modulos/Reservacion y ventas/components/ComponenteReservasYVentas';
import Dashboard from '../Dashboard/pages/Dashboard';

export default function DefinicionRutas() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas bajo /dashboard */}
      <Route
        path="/dashboard/*"
        element={<Dashboard />}
      >
        {/* Subrutas dentro del Dashboard */}
        <Route path="gestion-usuarios" element={<div>Gestión de Usuarios</div>} />
        <Route path="aeropuertos-aerolineas" element={<div>Operaciones de Vuelo</div>} />     
        <Route path="facturacion" element={<div>Facturación</div>} />
        <Route path="infraestructura" element={<div>Infraestructura Aeroportuaria</div>} />
        <Route path="servicios" element={<div>Operaciones y Servicios</div>} />
        <Route path="reportes" element={<div>Reportes y Simulación</div>} />
        <Route index element={<div>Bienvenido al dashboard</div>} />
      </Route>

      {/* Ruta raíz */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
