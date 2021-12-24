import SpotifyPLayer from 'react-spotify-web-playback';
import { useState, useEffect } from 'react';
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
            magnifySliderOnHover={true}
        />
    );
}

export default Player;