import './style.scss';
import loupe from '../../assets/loupe.png';

const Header = function({value, onChangeInput}) {
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
        </header>
    );
}

export default Header;