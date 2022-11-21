const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('./dist/app-heroku'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/spotitrack/'}),
);
app.listen(process.env.PORT || 8080);