import '../Gestion_Usuarios/GestionUsuarios.css';
import { useNavigate } from 'react-router-dom';

const GestionFacturacionPagos = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      titulo: 'Facturación',
      descripcion: 'Emisión y gestión de facturas para pasajeros, aerolíneas y servicios especiales. Incluye validación fiscal y reportes.',
      ruta: '/pagos/facturacion',
    },
    {
      titulo: 'Pagos',
      descripcion: 'Controla los métodos de pago, transacciones, cancelaciones y devoluciones tanto en línea como presenciales.',
      ruta: '/pagos/pagos',
    },
    {
      titulo: 'Mercancías',
      descripcion: 'Gestión de cobros por transporte de mercancías, almacenaje y servicios logísticos asociados.',
      ruta: '/pagos/mercancias',
    },
  ];

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Facturación y Pagos</h2>
      <div className="tarjetas-container">
        {opciones.map((opcion, idx) => (
          <div key={idx} className="tarjeta" onClick={() => navigate(opcion.ruta)}>
            <h3>{opcion.titulo}</h3>
            <p>{opcion.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionFacturacionPagos;
