import './style.scss';
import Track from './Track';

function TracksList({tracks}) {

    const smallestImage = (images) => {
        return images.reduce((acc, currentImg) => {
            if(currentImg.height < acc.height) acc = currentImg;
            return acc;
        }, images[0]);
    };

    return(
        <ul className="tracks-list">
            {tracks.map(track => {
                const trackObj = {
                    name: track.name,
                    artists: track.artists,
                    uri: track.uri,
                    img: smallestImage(track.album.images)
                }
                return (
                    <Track  {...trackObj} key={track.id}/>
                );
            })}
        </ul>
    );
}

export default TracksList;