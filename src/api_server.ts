import http from 'http';

export const ApiPort = 38502;

const api_server = http.createServer();

export
const ApiServer = api_server;

export
function Start() {
  api_server.listen(ApiPort);
}
