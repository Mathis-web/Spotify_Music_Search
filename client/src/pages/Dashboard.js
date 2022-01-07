import SpotifyWebApi from 'spotify-web-api-node';
import { useState, useEffect, useRef } from 'react';

import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';
import Error from '../components/Error';
import SearchBar from '../components/SearchBar';
import TracksList from '../components/TracksList';

function Dashboard({ code }) {

  const accessToken = useAuth(code);
  const spotifyApi = new SpotifyWebApi();
  let timeout = useRef(null);

  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const onChangeInput = (value) => setSearchInput(value);

  useEffect(() => {
    if(isLoading) return;
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.searchTracks(searchParam)
        .then((data) => {
          setResults(data.body.tracks.items);
        })
        .catch(err => {
          console.log(err.message)
          setError('Une erreur est survenue. Veuillez relancer l\'application.');
        });
  }, [isLoading]);

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
          window.history.pushState({}, '', `${window.location.origin}?search=${searchInput}`);
        })
        .catch(err => {
          console.log(err.message)
          setError('Une erreur est survenue. Veuillez relancer l\'application.');
        });
    }, 500);
  }, [searchInput])

  if(isLoading) return <Loading />

    return(
        <>
            <SearchBar value={searchInput} onChangeInput={onChangeInput} />
            {results.length > 0 
                ? <TracksList tracks={results} />
                : <p className="home__text" style={{color: 'white', textAlign: 'center', marginTop: '1rem'}}>Aucun résultat pour votre recherche.</p>
            }
            {error && <Error content={error} />}
        </>
    );
}

export default Dashboard;