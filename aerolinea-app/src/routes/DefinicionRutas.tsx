import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../autenticacion/pages/login';
import Dashboard from '../Dashboard/pages/Dashboard';
import GestionUsuarios from '../modulos/Gestion_Usuarios/GestionUsuarios';
import GestionOperaciones from '../modulos/Operacion_vuelos/GestionOperaciones';
import GestionReservasVentas from '../modulos/Reservacion y ventas/ReservasYVentas';
import GestionFacturacionPagos from '../modulos/facturacion_pagos/GestionFacturacionPagos';
import GestionInfraestructura from '../modulos/infraestructura/GestionInfraestructura';
import GestionOperacionesServicios from '../modulos/Operaciones_servicios/GestionOperacionesServicios';
import GestionReportesSimulacion from '../modulos/reporte y simulacion/GestionReportesSimulacion';
import Reservas from '../modulos/Reservacion y ventas/Reservas';
import Aeropuertos from '../modulos/Operacion_vuelos/Aeropuertos';
import Aerolineas from '../modulos/Operacion_vuelos/Aerolineas';
import Aviones from '../modulos/Operacion_vuelos/Aviones';
import ProgramaVuelos from '../modulos/Operacion_vuelos/ProgramasVuelos';
import Vuelos from '../modulos/Operacion_vuelos/Vuelos';
import HorariosVuelos from '../modulos/Operacion_vuelos/HorariosVuelos';
import Escalas from '../modulos/Operacion_vuelos/Escalas';
import Equipaje from '../modulos/Reservacion y ventas/Equipaje';
import Portales from '../modulos/Reservacion y ventas/Portales';
import Facturacion from '../modulos/facturacion_pagos/Facturacion/Facturacion';
import Pagos from '../modulos/facturacion_pagos/Pagos/Pagos';
import Mercancias from '../modulos/facturacion_pagos/Mercancias/Mercancias';
import Pistas from '../modulos/infraestructura/Pistas/Pistas';
import Usuarios from '../modulos/Gestion_Usuarios/Usuarios/Usuarios';




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
        <Route path="contribuyentes/Aeropuertos" element={<Aeropuertos/>} />   
        <Route path="contribuyentes/Aerolineas" element={<Aerolineas/>} /> 
        <Route path="contribuyentes/Aviones" element={<Aviones/>} />
        <Route path="contribuyentes/ProgramasVuelos" element={<ProgramaVuelos/>} />       
        <Route path="contribuyentes/Vuelos" element={<Vuelos/>} />
        <Route path="contribuyentes/HorariosVuelos" element={<HorariosVuelos/>} />        
        <Route path="contribuyentes/Escalas" element={<Escalas/>} /> 
        <Route path="Reservas" element={<GestionReservasVentas/>} />
        <Route path="reservas/reservas" element={<Reservas/>} />
        <Route path="reservas/equipajes" element={<Equipaje/>} />
        <Route path="reservas/portales" element={<Portales/>} />
        <Route path="requisitos" element={<GestionInfraestructura/>} />
        <Route path="solicitudes-y-avisos" element={<GestionOperacionesServicios/>} />
        <Route path="vehiculos" element={<GestionReportesSimulacion/>} />
        <Route path="mis-documentos" element={<GestionFacturacionPagos/>} />
        <Route path="mis-documentos/facturacion" element={<Facturacion/>} />
        <Route path="mis-documentos/pagos" element={<Pagos/>} />
        <Route path="mis-documentos/mercancias" element={<Mercancias/>} />
        <Route path="infraestructura/pistas" element={<Pistas/>} />
        <Route path="gestion_usuario/usuarios" element={<Usuarios/>} />
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
