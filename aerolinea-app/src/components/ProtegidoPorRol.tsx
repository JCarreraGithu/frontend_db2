import type { ReactNode } from 'react';
import { useUsuario } from '../autenticacion/contextos/UsuarioContexto';

interface Props {
  rolPermitido: string;
  children: ReactNode;
}

export function ProtegidoPorRol({ rolPermitido, children }: Props) {
  const { usuario } = useUsuario();

  if (!usuario || usuario.rol !== rolPermitido) return null;
  return children;
}
