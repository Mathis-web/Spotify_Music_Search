import './style.scss';
import useAuth from '../../hooks/useAuth';
import Home from '../../pages/Home';
import Loading from '../Loading';

import { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';

function App() {

  const accessToken = useAuth();
  const spotifyApi = new SpotifyWebApi();
  let timeout = useRef(null);

  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const onChangeInput = (value) => setSearchInput(value);

  useEffect(() => {
    if(!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    setIsLoading(false);
  }, [accessToken]);

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken);
    if(searchInput === "" || !spotifyApi.getAccessToken()) return;
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      spotifyApi.searchTracks(searchInput)
      .then((data) => {
        setResults(data.body.tracks.items);
      })
      .catch(err => {
        setError('Une erreur est survenue. Veuillez relancer l\'application.');
      });
    }, 500);
  }, [searchInput])

  if(isLoading) return <Loading />

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <Home value={searchInput} onChangeInput={onChangeInput} error={error} tracks={results} />
        } />
      </Routes>

    </div>
  );
}

export default App;
