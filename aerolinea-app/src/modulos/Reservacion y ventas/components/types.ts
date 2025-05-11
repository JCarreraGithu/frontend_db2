export interface Vuelo {
  id: number;
  origen: string;
  destino: string;
  fecha: string;
  asientosDisponibles: number;
}

export interface Reserva {
  id: number;
  vueloId: number;
  usuarioId: number;
  asiento: string;
  modalidad: 'online' | 'aeropuerto';
  portalVenta?: string;
  pasaporte: string;
  visa?: string;
  equipaje: Equipaje[];
  estado: 'pendiente' | 'confirmada' | 'cancelada';
  facturaId?: number;
  pago: Pago;
}

export interface Equipaje {
  tipo: 'mano' | 'facturado';
  pesoKg: number;
}

export interface Pago {
  metodo: 'tarjeta' | 'efectivo' | 'transferencia';
  monto: number;
  fecha: string;
}
