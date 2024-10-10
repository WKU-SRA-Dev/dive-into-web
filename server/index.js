const express = require('express');
const demoRouter = require('./route/code-box/index.js');
const appRouter = require('./route/local-server/index.js');
const {codeBoxServe} = require('./sockets/code-box/index.js');

const htmlCodeBoxServer = express();
const cssCodeBoxServer = express();

codeBoxServe(htmlCodeBoxServer, 8080, 'index.html');
codeBoxServe(cssCodeBoxServer, 9090, 'style.css');

const demo = express();
const app = express();

demo.use(demoRouter);
app.use(appRouter);

demo.listen(3000, () => {
    console.log('lab demo server is running on port 3000 http://localhost:3000');
});

app.listen(3001, () => {
    console.log('click me to see the web page http://0.0.0.0:3001');
});





