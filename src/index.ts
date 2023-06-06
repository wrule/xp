import * as mockttp from 'mockttp';

import { CloseProxy, OpenProxy, ProxyPort } from './global_proxy';

async function main() {
  await OpenProxy();
  const proxy_server = mockttp.getLocal();
  proxy_server.start(ProxyPort);
}

main();
