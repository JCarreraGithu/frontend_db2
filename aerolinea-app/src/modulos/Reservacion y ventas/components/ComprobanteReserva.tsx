type Props = {
  reserva: any;
};

const ComprobanteReserva = ({ reserva }: Props) => {
  return (
    <div>
      <h4>Resumen de la Reserva</h4>
      <pre>{JSON.stringify(reserva, null, 2)}</pre>
    </div>
  );
};

export default ComprobanteReserva;
