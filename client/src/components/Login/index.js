function Login() {

    const generateRandomString = (length=6)=>Math.random().toString(20).substring(2, length);

    const authURL = new URLSearchParams({
        response_type: "code",
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state user-library-read user-library-modify",
        redirect_uri: "http://localhost:3000",
        state: generateRandomString(16)
    })

    const linkStyle = {
        backgroundColor: '#1DB954',
        color: 'white',
        display: 'block',
        width: 'fit-content',
        margin: '2rem auto',
        borderRadius: '30px',
        padding: '1rem 2rem',
        fontSize: '1.5rem',
        textDecoration: 'none',
        textAlign: 'center'
    }

    return(
        <a style={linkStyle} href={`https://accounts.spotify.com/authorize/?${authURL}`}>Login to Spotify</a>
    );
}

export default Login;