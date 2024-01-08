import http from 'http';
// import https from 'https';
// import fs from 'fs';
// import compression from 'compression'
// import helmet from 'helmet';

import express from 'express';
// import React from 'react';    not using server side rendering anymore for now...
// import ReactDOMServer from 'react-dom/server';
// import App from '../components/App';

const app = express();
// app.use(compression());   //TODO: get these turned back on
// app.use(helmet());

// could switch to static file serving, perhaps even with initial react components rendered already and using react's hydrate on the client side
app.use(express.static('dist'));


// old: going to just use Heroku out of the box SSL for the moment. Technically should add https redirects and use helmet to avoid https downgrades and stuff
// TODO: ponder doing something with Amazon EC2 since we aren't using Heroku anymore...  
// for local https development
// const options = {
//     key: fs.readFileSync("./cert/key.pem"),
//     cert: fs.readFileSync("./cert/cert.pem"),
// };
//const server = https.createServer(options, app);

const server = http.createServer(app);

var port = normalizePort(process.env.PORT || '4242');



server.listen(port, () => console.log(`Server is running on port ${port}...`));


function normalizePort(val) {
	var port = parseInt(val, 10);
 
	if (isNaN(port)) {
		// named pipe
		return val;
	}
 
	if (port >= 0) {
		// port number
		return port;
	}
 
	return false;
 }