import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const respuesta = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setError(data.message || 'Error al iniciar sesión');
        return;
      }

      // Guardar token y datos de sesión
      localStorage.setItem('token', data.token);

      // Decodificar token para extraer rol (solo para mostrar, puedes usar jwt-decode si quieres)
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      const rol = payload.tipo_usuario;

      localStorage.setItem('usuario', JSON.stringify({ correo, rol }));

      // Redirigir al panel principal
      navigate('/inicio');
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div style={{
      backgroundColor: '#f0f0f0',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{ background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 0 10px #ccc' }}
      >
        <h2>Iniciar Sesión</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />
        <button type="submit" style={{ width: '100%' }}>Entrar</button>
      </form>
    </div>
  );
};

export default Login;
