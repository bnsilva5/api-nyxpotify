// src/services/spotifyService.js
import axios from 'axios';

const apiEndpoint = 'https://api.spotify.com/v1';
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

let token = null;
let tokenExpiration = null;

const getAccessToken = async () => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const expiresIn = response.data.expires_in * 1000; // Convertir a milisegundos
    token = response.data.access_token;
    tokenExpiration = Date.now() + expiresIn;
  } catch (error) {
    console.error('Error fetching access token', error);
  }
};

const ensureToken = async () => {
  if (!token || Date.now() >= tokenExpiration) {
    await getAccessToken();
  }
};

const searchTrackByName = async (trackName) => {
  await ensureToken();

  try {
    const response = await axios.get(`${apiEndpoint}/search`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        q: trackName,
        type: 'track'
      }
    });
    return response.data.tracks.items;
  } catch (error) {
    console.error('Error searching track by name', error);
    return [];
  }
};

export { searchTrackByName };
