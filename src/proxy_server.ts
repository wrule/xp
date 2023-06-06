import * as mockttp from 'mockttp';
import { ProxyPort } from './global_proxy';
import ca from './ca';

function Start() {
  const proxy_server = mockttp.getLocal({ https: ca });
  proxy_server.start(ProxyPort);
}
