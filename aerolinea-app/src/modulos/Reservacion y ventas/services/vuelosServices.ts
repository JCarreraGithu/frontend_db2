import axios from 'axios';

// Obtener todos los vuelos
export const obtenerVuelos = () => {
  return axios.get('/api/vuelos');
};

// Obtener vuelos disponibles según filtros
export const obtenerVuelosDisponibles = (filtros: {
  origen: string;
  destino: string;
  fecha: string;
}) => {
  return axios.post('/api/vuelos/disponibles', filtros);
};

// Obtener detalles de un vuelo específico
export const obtenerVueloPorId = (idVuelo: string) => {
  return axios.get(`/api/vuelos/${idVuelo}`);
};

// Crear un nuevo vuelo
export const crearVuelo = (vueloData: any) => {
  return axios.post('/api/vuelos', vueloData);
};

// Eliminar un vuelo
export const eliminarVuelo = (idVuelo: string) => {
  return axios.delete(`/api/vuelos/${idVuelo}`);
};
