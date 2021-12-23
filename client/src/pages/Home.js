import Header from '../components/Header';
import TracksList from '../components/TracksList';

function Home({searchInput, onChangeInput, error, tracks}) {
    return(
        <>
            <Header value={searchInput} onChangeInput={onChangeInput} error={error} />
            {tracks.length > 0 
                ? <TracksList tracks={tracks} />
                : <p className="home__text" style={{color: 'white', textAlign: 'center', marginTop: '1rem'}}>Aucun résultat pour votre recherche.</p>
            }
        </>
    );
}

export default Home;