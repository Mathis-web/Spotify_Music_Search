require('dotenv').config();
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/api/login', async (req, res, next) => {
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
    });
    spotifyApi.authorizationCodeGrant(req.body.code)
        .then(data => {
            res.status(200).json({
                accessToken: data.body['access_token'],
                resfreshToken: data.body['refresh_token'],
                expiresIn: data.body['expires_in']
            });
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'Une erreur est survenue lors de la récupération du token.'});
        })
});

app.post('/api/refreshToken', async (req, res, next) => {
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
        refreshToken: req.body.refreshToken,
    });
    console.log(req.body.refreshToken);
    spotifyApi.refreshAccessToken()
        .then(data => {
            res.status(200).json({
                accessToken: data.body['access_token'],
                expiresIn: data.body['expires_in']
            });
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'Une erreur est survenue lors de la récupération du token.'});
        })
});

app.listen(PORT, () => console.log(`server launch on port ${PORT}`))
