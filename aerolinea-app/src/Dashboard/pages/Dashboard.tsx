import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // setData(responseData);
  }, []);

  return (
    <div className="dashboard-container">
      {/* SECCIÓN ENCIMA DEL NAV */}
      <div className="header-section">
        <div className="header-title">Bienvenido al Aeropuerto La Aurora</div>
        <p className="header-subtitle">Gestiona vuelos, usuarios y más desde esta plataforma</p>
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <ul className="navbar-list">
          <li><Link to="/gestion-usuarios" className="navbar-link">Gestión de usuarios</Link></li>
          <li><Link to="/aeropuertos-aerolineas" className="navbar-link">Aeropuertos y aerolíneas</Link></li>
          <li><Link to="/gestion-vuelos" className="navbar-link">Gestión de vuelos</Link></li>
          <li><Link to="/reservas-clientes" className="navbar-link">Reservas y clientes</Link></li>
          <li><Link to="/facturacion-pagos" className="navbar-link">Facturación y pagos</Link></li>
          <li><Link to="/mantenimiento-personal" className="navbar-link">Mantenimiento y personal</Link></li>
          <li><Link to="/operaciones-soporte" className="navbar-link">Operaciones y soporte</Link></li>
          <li><Link to="/simulacion-analisis" className="navbar-link">Simulación y análisis</Link></li>
        </ul>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <div className="main-content">

        {/* GALERÍA DE IMÁGENES */}
        <div className="image-gallery">
          <div className="gallery-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRzLHvW4ZEBBaOvBG9felm34mUdSx-jBzj1I8LoZfA0Re_4Zsq3nVCwQ6oxen9Rlos_1s&usqp=CAU" alt="Aeropuerto 1" />
          </div>
          <div className="gallery-card">
            <img src="https://www.eleconomista.net/__export/1692046806455/sites/prensagrafica/img/2023/08/14/254586d742d05899d2692de8f3535d90.jpg_1005196607.jpg" alt="Aeropuerto 2" />
          </div>
          <div className="gallery-card">
            <img src="https://www.avionrevue.com/wp-content/uploads/2024/01/mexico-aerop.jpg" alt="Aeropuerto 3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
