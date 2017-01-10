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

const SERVER_HTTP_IP = '0.0.0.0';
const SERVER_HTTP_PORT = 3000;
const SERVER_TCPIP_PORT = 1337;

configRoutes(app);

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

server.listen(SERVER_HTTP_PORT, SERVER_HTTP_IP, () => {
	winston.log('info', `HTTP Server listering on port: ${SERVER_HTTP_PORT} and IP: ${SERVER_HTTP_IP}`);
});

serverTCP.listen(SERVER_TCPIP_PORT, () => {
	winston.log('info', `TCP/IP Server listering on port: ${SERVER_TCPIP_PORT} and IP: ${SERVER_HTTP_IP}`);
})

io.on('connection', (client) => {
	winston.log('info', 'new client io');
});

serverTCP.on('connection', (socket) => {
	winston.log('info', 'new client');
});

export default app;

//http://192.168.15.7:3000/