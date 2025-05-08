import { createContext, useContext, useState } from 'react';

interface Usuario {
  nombre: string;
  rol: string;
}

interface UsuarioContextoTipo {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
}

const UsuarioContext = createContext<UsuarioContextoTipo | null>(null);

export const UsuarioProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => {
  const contexto = useContext(UsuarioContext);
  if (!contexto) throw new Error("useUsuario debe usarse dentro de UsuarioProvider");
  return contexto;
};
