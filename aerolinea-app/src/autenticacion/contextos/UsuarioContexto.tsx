import { createContext, useEffect, useState } from 'react';

interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  tipo_usuario: string;
}

interface UsuarioContextType {
  usuario: Usuario | null;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
}

export const UsuarioContext = createContext<UsuarioContextType>({
  usuario: null,
  setUsuario: () => {},
});

export const UsuarioProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // 👉 Simulación de inicio de sesión
  useEffect(() => {
    const usuarioSimulado = {
      id_usuario: 1,
      nombre: "Usuario Prueba",
      correo: "prueba@correo.com",
      tipo_usuario: "admin", // puedes probar con: "operador", "tecnico", etc.
    };

    localStorage.setItem('token', 'simulado-token');
    localStorage.setItem('usuario', JSON.stringify(usuarioSimulado));
    setUsuario(usuarioSimulado);
  }, []);

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};
