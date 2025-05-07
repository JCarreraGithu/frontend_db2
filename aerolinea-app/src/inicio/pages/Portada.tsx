import { useUsuario } from '../../autenticacion/contextos/UsuarioContexto';
import { Link } from 'react-router-dom';

export default function Portada() {
  const { usuario } = useUsuario();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenido, {usuario?.nombre}</h1>
      <p>Rol: {usuario?.rol}</p>

      <nav style={{ marginTop: '1rem' }}>
        {usuario?.rol === 'admin' && <Link to="/vuelos">Gestión de Vuelos</Link>}
        {usuario?.rol === 'soporte' && <p>No tienes acceso a gestión de vuelos</p>}
      </nav>
    </div>
  );
}
