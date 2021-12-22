import './style.scss';
import useAuth from '../../hooks/useAuth';
import Header from '../Header';
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
        console.log(data);
      })
      .catch(err => console.dir(err));
    }, 500);
  }, [searchInput])

  if(isLoading) return <Loading />

  return (
    <div className="app">
    <Header value={searchInput} onChangeInput={onChangeInput} />
     
    </div>
  );
}

export default App;
