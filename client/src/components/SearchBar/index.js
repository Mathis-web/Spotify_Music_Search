import './style.scss';
import loupe from '../../assets/loupe.png';

function SearchBar({value, onChangeInput}) {
    return(
        <div className="search-bar">
            <img src={loupe} alt="" className="search-bar__img"/>
            <input 
                type="text" 
                name="search" 
                className="search-bar__input" 
                placeholder="Chercher un morceau / artiste"
                value={value} 
                onChange={(e) => onChangeInput(e.target.value)} 
            />
        </div>
    );
}

export default SearchBar;