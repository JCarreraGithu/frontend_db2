import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../autenticacion/pages/login';
import Inicio from '../paginas/Inicio';
import Dashboard from '../Dashboard/pages/Dashboard';

export default function DefinicionRutas() {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica si hay un token en el localStorage

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Ruta protegida para el Dashboard */}
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
