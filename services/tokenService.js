import axios from 'axios';

export const refreshToken = async (platform) => {
  try {
    const refreshToken = localStorage.getItem(`${platform}_refresh_token`);
    if (!refreshToken) throw new Error('Refresh token no encontrado');

    // Valores confidenciales (APP_ID y APP_SECRET) se deben almacenar en el entorno
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

    const response = await axios.post(`https://graph.facebook.com/v12.0/oauth/access_token`, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    });

    // Guarda el nuevo access token en localStorage
    localStorage.setItem(`${platform}_access_token`, response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error(`Error al actualizar el token de ${platform}:`, error);
    throw error;
  }
};
