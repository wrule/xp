import * as mockttp from 'mockttp';
import { ProxyPort } from './global_proxy';
import ca from './ca';

export
function Start() {
  const proxy_server = mockttp.getLocal({ https: ca });
  proxy_server.on('request', (req) => {
    console.log(req.url);
  });
  proxy_server.forAnyRequest().thenPassThrough();
  proxy_server.start(ProxyPort);
}
