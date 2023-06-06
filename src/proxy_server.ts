import * as mockttp from 'mockttp';
import { CloseProxy, OpenProxy, ProxyPort } from './global_proxy';
import ca from './ca';

const proxy_server = mockttp.getLocal({ https: ca });
proxy_server.on('request', (req) => {
  console.log(req.url);
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
