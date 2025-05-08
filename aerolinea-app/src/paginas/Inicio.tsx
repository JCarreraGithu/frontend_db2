// src/paginas/Inicio.tsx
import React from 'react';

const Inicio = () => {
  const datosUsuario = localStorage.getItem('usuario');
  const usuario = datosUsuario ? JSON.parse(datosUsuario) : null;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenido, {usuario?.usuario}</h1>
      <p>Tu rol es: <strong>{usuario?.rol}</strong></p>
      {/* Aquí puedes mostrar opciones según el rol */}
    </div>
  );
};

export default Inicio;
