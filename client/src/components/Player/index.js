import SpotifyPLayer from 'react-spotify-web-playback';
import './style.scss';

function Player({accessToken, currentTrackURI, tracks}) {

   const currentTrack = tracks.find((track) => (track.uri === currentTrackURI));
   const indexCurrentTrack = tracks.indexOf(currentTrack);

    return (
        <SpotifyPLayer 
            autoPlay={true}
            token={accessToken}
            uris={tracks.length > 0 ? tracks.map(track => track.uri) : []}
            offset={indexCurrentTrack || 0}
            showSaveIcon={true}
        />
    );
}

export default Player;