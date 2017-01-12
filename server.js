import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import winston from 'winston';
import configRoutes from './app/routes/main';
import socketIO from 'socket.io';
import http from 'http';
import net from 'net';

let app = express();
let server = http.createServer(app); 
let io = socketIO.listen(server);
let serverTCP = net.createServer();
let currentArduino = null;

const SERVER_HTTP_PORT = 3000;
const SERVER_TCPIP_PORT = 1337;
const SERVER_HTTP_IP = '0.0.0.0';
const SERVER_TCPIP_IP = '0.0.0.0';

configRoutes(app);

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static('./app/assets'));
app.set('view engine', 'pug');
app.set('views', './app/views');

//Http server
server.listen(SERVER_HTTP_PORT, SERVER_HTTP_IP, () => {
	winston.log('info', `HTTP Server listering on port: ${SERVER_HTTP_PORT} and IP: ${SERVER_HTTP_IP}`);
});

//TCP server
serverTCP.listen(SERVER_TCPIP_PORT, SERVER_TCPIP_IP, () => {
	winston.log('info', `TCP/IP Server listering on port: ${SERVER_TCPIP_PORT} and IP: ${SERVER_HTTP_IP}`);
});

serverTCP.on('connection', (socket) => {
	setTimeout(function () {
		socket.write('{pin: 13, mode: 1}');
	}, 5000);
	currentArduino = socket;
	winston.log('info', 'New client is now connected');
});

//Socket io server
io.on('connection', (client) => {
	winston.log('info', 'New client io connected');
});

io.on('message', (message) => {
	winston.log('info', 'New client io message');
	winston.log('info', message);
});

/*serverTCP.on('connection', (socket) => {
	winston.log('info', 'new client');
});*/

export default app;

//http://192.168.15.7:3000/