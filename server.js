import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

let app = express();

const SERVER_IP = '127.0.0.1';
const SERVER_PORT = '8080';