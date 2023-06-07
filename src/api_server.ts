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
router.get('/requests', (req, res) => {
  const decode = (url: any) => {
    try { return decodeURIComponent(url) } catch (e) { }
    return url;
  };
  res.setHeader('content-type', 'text/html');
  res.send(template);
  // res.send(`
  //   <!DOCTYPE html>
  //   <html><head><meta charset="utf-8"></head>
  //   <body style="font-size: 12px">
  //     <div style="margin-bottom: 8px">
  //       <button onclick="fetch('/api/proxy/start', { method: 'POST' })">start</button>
  //       <button onclick="fetch('/api/proxy/stop', { method: 'POST' })">stop</button>
  //       <button onclick="fetch('/api/request/clear', { method: 'POST' }).then(() => location.reload())">clear</button>
  //     </div>
  //     <ul style="margin: 0;padding: 0;list-style-type: none">
  //       ${RequestStore.GetAllRequests().map((request, index) => `<li>
  //         <span>${index + 1}.</span>
  //         <a style="color: blue" href="/api/request/${request.request?.id}/response_body">${decode(request.request?.url)}</a>
  //         <a style="color: purple" href="/api/request/${request.request?.id}/request_body">request</a>
  //         <a style="color: green" href="/api/request/${request.request?.id}">detail</a>
  //         ${request.request?.method === 'GET' ? `<a style="color: orange" href="${request.request?.url}">open</a>` : ''}
  //       </li>`).join('')}
  //     </ul>
  //   </body></html>
  // `);
});
router.post('/request/clear', (req, res) => {
  RequestStore.Clear();
  res.sendStatus(200);
});
router.get('/request/:id', (req, res) => {
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
