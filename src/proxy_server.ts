import * as mockttp from 'mockttp';
import { ProxyPort } from './global_proxy';

function Start() {
  const proxy_server = mockttp.getLocal();
  proxy_server.start(ProxyPort);
}
