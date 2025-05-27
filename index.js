import express from 'express';
import 'dotenv/config'
import initApp from './src/index.router.js';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import socketHandler from './socket.js';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: '*',
    },
});
const PORT = process.env.PORT || 3000;

initApp(app , express);

socketHandler(io);


server.listen(PORT, () => {
    console.log(`Server and socket is running on port ${PORT}...`);
});