import http from 'http';
import express from 'express';

const app = express();
app.use(express.static('dist'));
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