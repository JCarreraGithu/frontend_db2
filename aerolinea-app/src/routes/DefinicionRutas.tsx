import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../autenticacion/pages/login';
//import ComponenteReservasYVentas from '../modulos/Reservacion y ventas/components/ComponenteReservasYVentas';
import Dashboard from '../Dashboard/pages/Dashboard';
import GestionUsuarios from '../modulos/Gestion_Usuarios/GestionUsuarios';
import GestionOperaciones from '../modulos/Operacion_vuelos/GestionOperaciones';
import GestionReservasVentas from '../modulos/Reservacion y ventas/ReservasYVentas';
import GestionFacturacionPagos from '../modulos/facturacion_pagos/GestionFacturacionPagos';
import GestionInfraestructura from '../modulos/infraestructura/GestionInfraestructura';
import GestionOperacionesServicios from '../modulos/Operaciones_servicios/GestionOperacionesServicios';
import GestionReportesSimulacion from '../modulos/reporte y simulacion/GestionReportesSimulacion';


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
        <Route path="gestion-usuarios" element={<GestionUsuarios />} />
        <Route path="contribuyentes" element={<GestionOperaciones/>} />     
        <Route path="reservas" element={<GestionReservasVentas/>} />
        <Route path="requisitos" element={<GestionInfraestructura/>} />
        <Route path="solicitudes-y-avisos" element={<GestionOperacionesServicios/>} />
        <Route path="vehiculos" element={<GestionReportesSimulacion/>} />
        <Route path="mis-documentos" element={<GestionFacturacionPagos/>} />
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
