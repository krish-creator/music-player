
const client_id = '999675541e944b188df54ea6c8c521e3';
const redirect_uri = 'http://localhost:3000/';

const express = require('express')
const app = express();

app.get('/login', function (req, res) {

    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

app.listen(3000, () => {
    console.log("express listening");
})