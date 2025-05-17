import './GestionSimulacion.css';
import { useNavigate } from 'react-router-dom';

const GestionReportesSimulacion = () => {
  const navigate = useNavigate();

  const opciones = [
   
    { titulo: 'Programación Mundial', 
      descripcion: 'Define vuelos y conexiones internacionales conforme a acuerdos globales.',
       ruta: '/dashboard/reporte y simulacion/ProgramacionMundial' },
    { titulo: 'Simulación Tráfico Aéreo', 
      descripcion: 'Ejecuta simulaciones del tráfico aéreo para prever cuellos de botella y saturación.',
       ruta: '/dashboard/reporte y simulacion/SimulacionTraficoAereo' },
    { titulo: 'Simulación Flujo Pasajeros', 
      descripcion: 'Analiza el flujo de pasajeros en diferentes escenarios para optimizar espacios y servicios.', 
      ruta: '/dashboard/reporte y simulacion/SimulacionFlujoPasajeros' },
    { titulo: 'Simulación Impacto Financiero', 
      descripcion: 'Modela el impacto económico de decisiones estratégicas o imprevistos en la operación.',
       ruta: '/reportes/simulacion-impacto-financiero' },
  ];

  return (
    <div className="simulacion-wrapper">
      <h2 className="simulacion-titulo">Reportes y Simulación</h2>
      <div className="simulacion-grid">
        {opciones.map((opcion, idx) => (
          <div key={idx} className="tarjeta-simulacion" onClick={() => navigate(opcion.ruta)}>
            <h3>{opcion.titulo}</h3>
            <p>{opcion.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionReportesSimulacion;