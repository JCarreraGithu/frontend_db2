import { useEffect, useState } from "react";
import "./Usuarios.css";

type Usuario = {
  id_usuario: number;
  nombre: string;
  correo: string;
  tipo_usuario: string;
};

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    tipo_usuario: "cliente",
  });
  const [credenciales, setCredenciales] = useState({
    correo: "",
    contrasena: "",
  });
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mensaje) {
      const timeout = setTimeout(() => setMensaje(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [mensaje]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/usuarios");
      if (!res.ok) throw new Error(`❌ Error HTTP: ${res.status}`);

      const data = await res.json();
      console.log("Datos recibidos:", data); // Verificar datos en consola

      if (!Array.isArray(data)) throw new Error("❌ Respuesta inesperada de la API");

      const formateado = data.map((usuario: any) => ({
        id_usuario: usuario[0] ?? 0,
        nombre: usuario[1] ?? "Desconocido",
        correo: usuario[2] ?? "No especificado",
        tipo_usuario: usuario[3] ?? "Sin tipo",
      }));

      setUsuarios(formateado);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "❌ Error al cargar usuarios");
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const registrarUsuario = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!res.ok) throw new Error("❌ Error al registrar usuario");

      setMensaje("✅ Usuario registrado exitosamente");
      setNuevoUsuario({ nombre: "", correo: "", contrasena: "", tipo_usuario: "cliente" });
      obtenerUsuarios();
    } catch (error) {
      setError("❌ Error al registrar usuario");
    }
  };

  const iniciarSesion = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credenciales),
      });

      if (!res.ok) throw new Error("❌ Error en login");

      setMensaje("✅ Login exitoso");
      setCredenciales({ correo: "", contrasena: "" });
    } catch (error) {
      setError("❌ Credenciales incorrectas");
    }
  };

  return (
    <div className="usuarios-wrapper">
      <h1>👤 Gestión de Usuarios</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}
      {error && <p className="error">{error}</p>}
      {usuarios.length === 0 && !error && <p>No hay usuarios registrados.</p>}

      {/* REGISTRAR USUARIO */}
      <div className="usuarios-card">
        <h3>➕ Registrar Usuario</h3>

        <label htmlFor="nombre">Nombre Completo</label>
        <input id="nombre" type="text" placeholder="Ejemplo: Juan Pérez" value={nuevoUsuario.nombre} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })} />

        <label htmlFor="correo">Correo Electrónico</label>
        <input id="correo" type="email" placeholder="Ejemplo: juan@example.com" value={nuevoUsuario.correo} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })} />

        <label htmlFor="contrasena">Contraseña</label>
        <input id="contrasena" type="password" placeholder="••••••••" value={nuevoUsuario.contrasena} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, contrasena: e.target.value })} />

        <label htmlFor="tipo_usuario">Tipo de Usuario</label>
        <select id="tipo_usuario" value={nuevoUsuario.tipo_usuario} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, tipo_usuario: e.target.value })}>
          <option value="admin">Administrador</option>
          <option value="cliente">Cliente</option>
          <option value="staff">Staff</option>
        </select>

        <button onClick={registrarUsuario}>➕ Registrar</button>
      </div>

      {/* LOGIN */}
      <div className="usuarios-card">
        <h3>🔑 Iniciar Sesión</h3>

        <label htmlFor="login_correo">Correo Electrónico</label>
        <input id="login_correo" type="email" placeholder="Ejemplo: juan@example.com" value={credenciales.correo} onChange={(e) => setCredenciales({ ...credenciales, correo: e.target.value })} />

        <label htmlFor="login_contrasena">Contraseña</label>
        <input id="login_contrasena" type="password" placeholder="••••••••" value={credenciales.contrasena} onChange={(e) => setCredenciales({ ...credenciales, contrasena: e.target.value })} />

        <button onClick={iniciarSesion}>🔑 Iniciar Sesión</button>
      </div>

      {/* TABLA DE USUARIOS */}
      <table className="usuarios-tabla">
        <thead>
          <tr>
            <th>ID Usuario</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Tipo de Usuario</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.id_usuario}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.tipo_usuario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;