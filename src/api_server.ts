import http from 'http';
import express from 'express';

const app = express();
const api_server = http.createServer(app);

export const ApiPort = 38502;

export
const ApiServer = api_server;

export
function Start() {
  api_server.listen(ApiPort);
}
