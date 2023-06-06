import * as mockttp from 'mockttp';

import { CloseProxy, OpenProxy, ProxyPort } from './global_proxy';
import { Start } from './proxy_server';

async function main() {
  await OpenProxy();
  Start();
}

main();
