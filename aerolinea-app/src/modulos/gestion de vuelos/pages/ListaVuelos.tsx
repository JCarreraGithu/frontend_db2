import { useUsuario } from '../../../autenticacion/contextos/UsuarioContexto';

export default function ListaVuelos() {
  const { usuario } = useUsuario();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Gestión de Vuelos</h2>
      <p>Usuario: {usuario?.nombre}</p>

      <ul>
        <li>Vuelo 1 - Ciudad A a Ciudad B</li>
        <li>Vuelo 2 - Ciudad C a Ciudad D</li>
        <li>Vuelo 3 - Ciudad E a Ciudad F</li>
      </ul>
    </div>
  );
}
