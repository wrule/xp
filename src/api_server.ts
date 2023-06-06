import http from 'http';
import express from 'express';
import * as ProxyServer from './proxy_server';

const app = express();
const router = express.Router();
router.post('/proxy/start', async (req, res) => {
  await ProxyServer.Start();
  res.sendStatus(200);
});
router.post('/proxy/stop', async (req, res) => {
  await ProxyServer.Stop();
  res.sendStatus(200);
});
app.use('/api', router);
const api_server = http.createServer(app);

export const ApiPort = 38502;

export
const ApiServer = api_server;

export
function Start() {
  api_server.listen(ApiPort);
}
