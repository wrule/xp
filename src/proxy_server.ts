import * as mockttp from 'mockttp';
import { CloseProxy, OpenProxy, ProxyPort } from './global_proxy';
import ca from './ca';
import { IO } from './socket_server';
import * as RequestStore from './request_store';

const proxy_server = mockttp.getLocal({ https: ca });
proxy_server.on('request', (request) => {
  RequestStore.UpdateRequest(request);
  IO.emit('request', request);
  console.log(request.url);
});
proxy_server.on('response', (response) => {
  IO.emit('response', response);
  RequestStore.UpdateResponse(response);
});
proxy_server.forAnyRequest().thenPassThrough();

export
async function Start() {
  await proxy_server.start(ProxyPort);
  await OpenProxy();
  console.log('proxy_server started on port', ProxyPort, '...');
}

export
async function Stop() {
  await proxy_server.stop();
  await CloseProxy();
  console.log('proxy_server has stopped');
}
