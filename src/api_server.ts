import http from 'http';
import express from 'express';
import { CloseProxy, OpenProxy } from './global_proxy';

const app = express();
const router = express.Router();
router.post('/proxy/open', async (req, res) => {
  res.json(await OpenProxy());
});
router.post('/proxy/close', async (req, res) => {
  res.json(await CloseProxy());
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
