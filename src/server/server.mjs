import https from 'https';
import fs from 'fs';
import compression from 'compression'
import helmet from 'helmet';

import express from 'express';
// import React from 'react';    not using server side rendering anymore for now...
// import ReactDOMServer from 'react-dom/server';
// import App from '../components/App';

const app = express();
// app.use(compression());   //TODO: get these turned back on
// app.use(helmet());

// could switch to static file serving, perhaps even with initial react components rendered already and using react's hydrate on the client side
app.use(express.static('dist'));

const options = {
    key: fs.readFileSync("./cert/key.pem"),
    cert: fs.readFileSync("./cert/cert.pem"),
};
const server = https.createServer(options, app);

server.listen(4242, () => console.log('Server is running...'));