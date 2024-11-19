import axios from 'axios';

// Configura la URL base de tu API
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Cambia esta URL a tu API real
});

// Autenticación con redes sociales
export const connectSocialAccount = async (platform, authToken) => {
  try {
    const response = await api.post(`/social/connect/${platform}`, { authToken });
    return response.data;
  } catch (error) {
    console.error(`Error al conectar la cuenta de ${platform}:`, error);
    throw error;
  }
};

// Desconectar cuenta de red social
export const disconnectSocialAccount = async (platform) => {
  try {
    const response = await api.delete(`/social/disconnect/${platform}`);
    return response.data;
  } catch (error) {
    console.error(`Error al desconectar la cuenta de ${platform}:`, error);
    throw error;
  }
};

// Programar publicación
export const schedulePost = async (platform, content, scheduleDate) => {
  try {
    const response = await api.post(`/social/${platform}/schedule`, { content, scheduleDate });
    return response.data;
  } catch (error) {
    console.error(`Error al programar publicación en ${platform}:`, error);
    throw error;
  }
};

// Obtener estadísticas de la cuenta
export const getStats = async () => {
  try {
    const response = await api.get('/stats'); // Asegúrate de que esta ruta sea correcta
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }
};

// Obtener publicaciones
export const getPosts = async () => {
  try {
    const response = await api.get('/posts'); // Asegúrate de que esta ruta sea correcta
    return response.data;
  } catch (error) {
    console.error('Error al obtener publicaciones:', error);
    throw error;
  }
};

// Obtener comentarios
export const getComments = async () => {
  try {
    const response = await api.get('/comments'); // Asegúrate de que esta ruta sea correcta
    return response.data;
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    throw error;
  }
};

// Obtener datos del usuario
export const getUserData = async () => {
  try {
    const response = await api.get('/user'); // Cambia esta ruta según tu API
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    throw error;
  }
};

// Actualizar datos del usuario
export const updateUserData = async (data) => {
  try {
    const response = await api.put('/user', data); // Cambia esta ruta según tu API
    return response.data;
  } catch (error) {
    console.error('Error al actualizar datos del usuario:', error);
    throw error;
  }
};

// Obtener métricas de la cuenta
export const getMetrics = async (platform) => {
  try {
    const response = await api.get(`/social/${platform}/metrics`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener métricas de ${platform}:`, error);
    throw error;
  }
};

// Gestionar comentarios y mensajes
export const manageInteractions = async (platform) => {
  try {
    const response = await api.get(`/social/${platform}/interactions`);
    return response.data;
  } catch (error) {
    console.error(`Error al gestionar interacciones de ${platform}:`, error);
    throw error;
  }
};

// Obtener eventos del calendario
export const fetchCalendarEvents = async () => {
  try {
    const response = await api.get('/calendar/events'); // Cambia esta ruta a la que realmente maneje los eventos en tu API
    return response.data;
  } catch (error) {
    console.error('Error al obtener eventos del calendario:', error);
    throw error;
  }
};

