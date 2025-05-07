import { useUsuario } from '../autenticacion/contextos/UsuarioContexto';

export function ProtegidoPorRol({ rolPermitido, children }) {
  const { usuario } = useUsuario();

  if (!usuario || usuario.rol !== rolPermitido) return null;
  return children;
}
