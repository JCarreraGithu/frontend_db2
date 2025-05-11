type Props = {
  setReserva: React.Dispatch<React.SetStateAction<any>>;
};

const TablaVuelosDisponibles = ({ setReserva }: Props) => {
  // Aquí podrías traer los vuelos disponibles con un useEffect y setear el vuelo seleccionado
  return (
    <div>
      <h4>Seleccionar vuelo</h4>
      {/* Mostrar tabla con vuelos y permitir selección */}
    </div>
  );
};

export default TablaVuelosDisponibles;
