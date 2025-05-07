import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../autenticacion/pages/login';
import ListaVuelos from '../modulos/Vuelo/pages/ListaVuelos';
import Inicio from '../paginas/Inicio';

export default function DefinicionRutas() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/vuelos" element={<ListaVuelos />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
