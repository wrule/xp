import * as mockttp from 'mockttp';
import { CloseProxy, OpenProxy, ProxyPort } from './global_proxy';
import ca from './ca';
import { IO } from './socket_server';
import * as RequestStore from './request_store';
import { decode } from './utils';

const proxy_server = mockttp.getLocal({ https: ca });
let started = false;

export
async function Start() {
  if (started) return;
  proxy_server.on('request', (request) => {
    RequestStore.UpdateRequest(request);
    IO.emit('request', { ...request, body: undefined });
    console.log(request.id, decode(request.url));
  });
  proxy_server.on('response', (response) => {
    RequestStore.UpdateResponse(response);
    IO.emit('response', { ...response, body: undefined });
  });
  proxy_server.forAnyRequest().thenPassThrough();
  await proxy_server.start(ProxyPort);
  await OpenProxy();
  console.log('proxy_server started on port', ProxyPort, '...');
  started = true;
}

export
async function Stop() {
  if (!started) return;
  await proxy_server.stop();
  await CloseProxy();
  console.log('proxy_server has stopped');
  started = false;
}
