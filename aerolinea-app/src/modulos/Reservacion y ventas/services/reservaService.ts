import axios from 'axios';

// Obtener todas las reservas
export const obtenerReservas = () => {
  return axios.get('/api/reservas');
};

// Obtener reservas por ID de usuario
export const obtenerReservasPorUsuario = (idUsuario: string) => {
  return axios.get(`/api/reservas/usuario/${idUsuario}`);
};

// Crear una nueva reserva
export const crearReserva = (reservaData: any) => {
  return axios.post('/api/reservas', reservaData);
};

// Actualizar una reserva existente
export const actualizarReserva = (idReserva: string, reservaData: any) => {
  return axios.put(`/api/reservas/${idReserva}`, reservaData);
};

// Eliminar una reserva
export const eliminarReserva = (idReserva: string) => {
  return axios.delete(`/api/reservas/${idReserva}`);
};
