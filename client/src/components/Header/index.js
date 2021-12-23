import './style.scss';

const Header = function({value, onChangeInput}) {
    return (
        <header className="header">
            <h1 className="header__title">Spotify Music Search</h1>
        </header>
    );
}

export default Header;