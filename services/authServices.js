import axios from 'axios';

const api = axios.create({
  baseURL: 'https://graph.facebook.com/v12.0', // API base para Facebook e Instagram
});

const platformConfig = {
  facebook: {
    apiUrl: 'https://graph.facebook.com/v12.0',
    endpoint: '/oauth/access_token',
    params: (authCode) => ({
      client_id: import.meta.env.VITE_FACEBOOK_CLIENT_ID,
      client_secret: import.meta.env.VITE_FACEBOOK_CLIENT_SECRET,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      code: authCode,
    }),
  },
  tiktok: {
    apiUrl: 'https://open-api.tiktok.com',
    endpoint: '/oauth/access_token',
    params: (authCode) => ({
      client_key: import.meta.env.VITE_TIKTOK_CLIENT_KEY,
      client_secret: import.meta.env.VITE_TIKTOK_CLIENT_SECRET,
      code: authCode,
      grant_type: 'authorization_code',
    }),
  },
  youtube: {
    apiUrl: 'https://www.googleapis.com/oauth2/v4',
    endpoint: '/token',
    params: (authCode) => ({
      client_id: import.meta.env.VITE_YOUTUBE_CLIENT_ID,
      client_secret: import.meta.env.VITE_YOUTUBE_CLIENT_SECRET,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      code: authCode,
      grant_type: 'authorization_code',
    }),
  },
  linkedin: {
    apiUrl: 'https://www.linkedin.com/oauth/v2',
    endpoint: '/accessToken',
    params: (authCode) => ({
      client_id: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
      client_secret: import.meta.env.VITE_LINKEDIN_CLIENT_SECRET,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      code: authCode,
      grant_type: 'authorization_code',
    }),
  },
};

// Función para conectar la cuenta a una plataforma
export const connectAccount = async (platform, authCode) => {
  try {
    const config = platformConfig[platform];
    
    if (!config) {
      throw new Error(`Plataforma no soportada: ${platform}`);
    }

    api.defaults.baseURL = config.apiUrl;

    const response = await api.post(config.endpoint, config.params(authCode));
    const { access_token } = response.data;
    localStorage.setItem(`${platform}_access_token`, access_token);
    
    return access_token;
  } catch (error) {
    console.error('Error connecting account:', error);
    throw error;
  }
};

// Nueva función para verificar el estado de suscripción del usuario
export const checkSubscriptionStatus = async (userId) => {
  try {
    const response = await api.get(`/subscriptions/status/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error verificando el estado de la suscripción:', error);
    throw error;
  }
};

// Nueva función para actualizar el estado de suscripción del usuario
export const updateSubscriptionStatus = async (userId, status) => {
  try {
    const response = await api.post(`/subscriptions/update/${userId}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error actualizando el estado de la suscripción:', error);
    throw error;
  }
};
