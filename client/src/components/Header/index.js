import './style.scss';
import loupe from '../../assets/loupe.png';
import Error from '../Error';

const Header = function({value, onChangeInput, error}) {
    return (
        <header className="header">
            <h1 className="header__title">Spotify Music Search</h1>
            <div className="header__input-container">
                <img src={loupe} alt="" />
                <input 
                    type="text" 
                    name="search" 
                    className="header__search-input" 
                    placeholder="Chercher un morceau / artiste / album"
                    value={value} 
                    onChange={(e) => onChangeInput(e.target.value)} 
                />
            </div>
            {error && <Error content={error} />}
        </header>
    );
}

export default Header;