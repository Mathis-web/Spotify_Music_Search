import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth() {
    const [accessToken, setAccessToken] = useState(null);
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        if(accessToken) return;
        const getAccessToken = async () => {
            try {
              const result = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/login`);
              setAccessToken(result.data.accessToken);
              setExpiresIn(result.data.expiresIn);
            } catch (error) {
              console.log(error.errorMessage);
            }
          };
          getAccessToken();
    }, []);

    return accessToken;
}