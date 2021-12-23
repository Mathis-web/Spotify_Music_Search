import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        const getAccessToken = async () => {
            try {
              const result = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/login`, {code});
              setAccessToken(result.data.accessToken);
              setRefreshToken(result.data.refreshToken);
              setExpiresIn(result.data.expiresIn);
            } catch (error) {
              if(error.errorMessage) console.log(error.errorMessage);
              window.location = "/";
            }
          };
          getAccessToken();
    }, [code]); 

    useEffect(() => {
      if (!refreshToken || !expiresIn) return
      const interval = setInterval(() => {
        axios
          .post(`${process.env.REACT_APP_BASE_API_URL}/api/refreshToken`, {
            refreshToken,
          })
          .then(res => {
            setAccessToken(res.data.accessToken)
            setExpiresIn(res.data.expiresIn)
          })
          .catch(() => {
            window.location = "/"
          })
      }, (expiresIn - 60) * 1000)
  
      return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken;
}