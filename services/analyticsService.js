import axios from 'axios';

const api = axios.create({
  baseURL: 'https://graph.facebook.com/v12.0',
});

export const getPostMetrics = async (postId, platform) => {
  const token = localStorage.getItem(`${platform}_access_token`);

  try {
    const response = await api.get(`/${postId}/insights`, {
      params: {
        access_token: token,
        metric: 'post_impressions,post_engagement',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching post metrics:', error);
    throw error;
  }
};
