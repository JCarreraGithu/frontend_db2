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

  const limpiarMensaje = () => setTimeout(() => setMensaje(null), 3000);
  const limpiarError = () => setTimeout(() => setError(null), 3000);

  const obtenerUsuarios = () => {
    fetch("http://localhost:3000/api/usuarios")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const formateado = data.map((arr: any[]) => ({
            id_usuario: arr[0],
            nombre: arr[1],
            correo: arr[2],
            tipo_usuario: arr[3],
          }));
          setUsuarios(formateado);
        } else {
          setError("❌ Error: formato inesperado de la API");
          limpiarError();
        }
      })
      .catch(() => {
        setError("❌ Error al cargar usuarios");
        limpiarError();
      });
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const registrarUsuario = () => {
    fetch("http://localhost:3000/api/usuarios/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    })
      .then((res) => {
        if (!res.ok) throw new Error("❌ Error al registrar usuario");
        return res.json();
      })
      .then(() => {
        setMensaje("✅ Usuario registrado exitosamente");
        setNuevoUsuario({ nombre: "", correo: "", contrasena: "", tipo_usuario: "cliente" });
        obtenerUsuarios();
        limpiarMensaje();
      })
      .catch(() => {
        setError("❌ Error al registrar usuario");
        limpiarError();
      });
  };

  const iniciarSesion = () => {
    fetch("http://localhost:3000/api/usuarios/login", { // Se cambió la API aquí
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credenciales),
    })
      .then((res) => {
        if (!res.ok) throw new Error("❌ Error en login");
        return res.json();
      })
      .then(() => {
        setMensaje("✅ Login exitoso");
        setCredenciales({ correo: "", contrasena: "" });
        limpiarMensaje();
      })
      .catch(() => {
        setError("❌ Credenciales incorrectas");
        limpiarError();
      });
  };

  return (
    <div className="usuarios-wrapper">
      <h1>👤 Gestión de Usuarios</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}
      {error && <p className="error">{error}</p>}

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