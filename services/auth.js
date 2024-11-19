import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // URL simulada
});

// Función para simular el login
export const loginUser = async (email, password) => {
  // Simulación de autenticación
  if (email === 'ag8388714@gmail.com' && password === '80120726yzj') {
    // Simulamos un token
    const simulatedResponse = {
      token: 'simulated_token',
      user: {
        email: 'ag8388714@gmail.com',
        name: 'Usuario Simulado',
      },
    };
    
    // Almacenamos el token en localStorage
    localStorage.setItem('token', simulatedResponse.token);
    return simulatedResponse;
  } else {
    throw new Error('Credenciales inválidas');
  }
};

// Función para verificar la autenticación
export const isAuthenticated = () => {
  // Revisamos si hay un token almacenado en localStorage
  return !!localStorage.getItem('token');
};

// Función para cerrar sesión
export const logoutUser = () => {
  // Eliminamos el token para cerrar sesión
  localStorage.removeItem('token');
};

// Nueva función para obtener datos del usuario
export const getUserData = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No autenticado');
  }

  // Simulamos la llamada a la API para obtener datos del usuario
  // Aquí se podrían usar axios para obtener datos reales desde un backend
  const simulatedUserData = {
    email: 'ag8388714@gmail.com',
    name: 'Usuario Simulado',
  };

  return simulatedUserData;
};
