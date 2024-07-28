// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);

  const getAccessToken = async () => {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', process.env.REACT_APP_SPOTIFY_CLIENT_ID);
    params.append('client_secret', process.env.REACT_APP_SPOTIFY_CLIENT_SECRET);

    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const expiresIn = response.data.expires_in * 1000; // Convertir a milisegundos
      setToken(response.data.access_token);
      setTokenExpiration(Date.now() + expiresIn);
      let now = new Date();
      alert( now );
      console.log("SE GENERA TOKEEEEEEEEEN", now);
    } catch (error) {
      console.error('Error fetching access token', error);
    }
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (!tokenExpiration || Date.now() >= tokenExpiration) {
        getAccessToken();
      }
    };

    checkTokenExpiration();

    const interval = setInterval(checkTokenExpiration, 1000 * 60 * 10); // Verifica cada 10 minutos
    return () => clearInterval(interval);
  }, [tokenExpiration]);

  return (
    <AuthContext.Provider value={token}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
