import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import winston from 'winston';

let app = express();

const SERVER_IP = '127.0.0.1';
const SERVER_PORT = '8080';

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.listen(SERVER_PORT, SERVER_IP, () => {
	winston.log('info', `Server listering on port: ${SERVER_PORT} and IP: ${SERVER_IP}`);
});

export default app;