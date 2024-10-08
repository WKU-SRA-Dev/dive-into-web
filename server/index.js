const express = require('express');
const router = require('./api/code-box/index.js');
const {codeBoxServe} = require('./sockets/code-box/index.js');

const htmlCodeBoxServer = express();
const cssCodeBoxServer = express();

htmlCodeBoxServer.use(express.static(__dirname));
cssCodeBoxServer.use(express.static(__dirname));

codeBoxServe(htmlCodeBoxServer, 8080, 'index.html');
codeBoxServe(cssCodeBoxServer, 9090, 'style.css');

const app = express();

app.use(router);

app.listen(3000, () => {
    console.log('lab demo server is running on port 3000 http://localhost:3000');
});






