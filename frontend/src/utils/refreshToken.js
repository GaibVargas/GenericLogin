import api from '../services/api';

async function refreshTokenIfNeed(refreshToken, userId) {
  try {
    const response = await api.post('/refresh', {
      refreshToken,
      userId
    });

    return {
      accessToken: response.data.accessToken,
    }
  } catch(error) {
    throw error;
  }
}

export default refreshTokenIfNeed;