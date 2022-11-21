const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('./docs/'));

app.get('/*', (req, res) =>{
    res.sendFile('index.html', {root: 'docs/'})},
);
app.listen(process.env.PORT || 8080);