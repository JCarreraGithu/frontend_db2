import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaPlaneDeparture } from 'react-icons/fa';
import './login.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Error en el login');

      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      {/* Lado izquierdo con título y descripción */}
      <div className="login-left">
        <div className="login-left-title">AEROPUERTO INTERNACIONAL LA AURORA</div>
        <p className="login-left-description">
          El Aeropuerto Internacional La Aurora es el principal aeropuerto de Guatemala, ubicado en la zona 13 de la Ciudad de Guatemala. Este aeropuerto sirve como una importante puerta de entrada al país, ofreciendo conexiones a destinos nacionales e internacionales.
        </p>
      </div>

      {/* Lado derecho con formulario de login */}
      <div className="login-box">
        <div className="login-title">
        <div className="login-icon-container">
    <FaPlaneDeparture className="login-icon" />
  </div>
  <div className="login-text">Inicio Sesión</div>
        </div>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="relative">
            <FaUser className="input-icon" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <div className="relative">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <button type="submit" className="login-button">Entrar</button>
        </form>

        <div className="login-links">
          <a href="#">¿Olvidaste tu contraseña?</a>
          <a href="#">Crear cuenta</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
