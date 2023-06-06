import http from 'http';
import express from 'express';
import * as ProxyServer from './proxy_server';
import * as RequestStore from './request_store';

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
router.get('/request/:id', async (req, res) => {
  const request = RequestStore.GetRequest(req.params.id);
  if (request) res.json({
    request: { ...request.request, body: undefined },
    response: { ...request.response, body: undefined },
  });
  else res.sendStatus(404);
});
router.get('/request/:id/request_body', (req, res) => {
  const request = RequestStore.GetRequest(req.params.id);
  if (request) {
    res.setHeader('content-type', request.request?.headers['content-type'] || 'text/plain');
    res.send(request.request?.body.buffer);
  }
  else res.sendStatus(404);
});
router.get('/request/:id/response_body', (req, res) => {
  const request = RequestStore.GetRequest(req.params.id);
  if (request) {
    res.setHeader('content-type', request.response?.headers['content-type'] || 'text/plain');
    res.send(request.response?.body.buffer);
  }
  else res.sendStatus(404);
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
