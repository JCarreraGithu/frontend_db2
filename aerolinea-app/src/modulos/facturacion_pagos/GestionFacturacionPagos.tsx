import './GestionFacturacionPagos.css';
import { useNavigate } from 'react-router-dom';

const GestionFacturacionPagos = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      titulo: 'Facturación',
      descripcion: 'Emisión y gestión de facturas para pasajeros, aerolíneas y servicios especiales. Incluye validación fiscal y reportes.',
      ruta: '/dashboard/mis-documentos/facturacion',
    },
    {
      titulo: 'Pagos',
      descripcion: 'Controla los métodos de pago, transacciones, cancelaciones y devoluciones tanto en línea como presenciales.',
      ruta: '/dashboard/mis-documentos/pagos',
    },
    {
      titulo: 'Mercancías',
      descripcion: 'Gestión de cobros por transporte de mercancías, almacenaje y servicios logísticos asociados.',
      ruta: '/dashboard/mis-documentos/mercancias',
    },
  ];

  return (
    <div className="facturacion-wrapper">
      <h2 className="facturacion-titulo">Facturación y Pagos</h2>
      <div className="facturacion-grid">
        {opciones.map((opcion, idx) => (
          <div key={idx} className="tarjeta-factura" onClick={() => navigate(opcion.ruta)}>
            <h3>{opcion.titulo}</h3>
            <p>{opcion.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionFacturacionPagos;
