const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('./docs/'));
/* Inicio do nosso servidor. Ele irá redirecionar para o arquivo index.html
    Arquivos com .spec.ts são arquivos de testes gerados pelo próprio Angular
*/
app.get('/*', (req, res) =>{
    res.sendFile('index.html', {root: 'docs/'})},
);
app.listen(process.env.PORT || 4200);