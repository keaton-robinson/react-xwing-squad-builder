import express from 'express';
// import React from 'react';    not using server side rendering anymore for now...
// import ReactDOMServer from 'react-dom/server';
// import App from '../components/App';

const server = express();
server.use(express.static('dist'));
// could switch to static file serving, perhaps even with initial react components rendered already and using react's hydrate on the client side

server.listen(4242, () => console.log('Server is running...'));