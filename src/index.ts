import * as ProxyServer from './proxy_server';
import * as ApiServer from './api_server';

export
async function Start() {
  await ProxyServer.Start();
  await ApiServer.Start();
}

export
async function Stop() {
  await ProxyServer.Stop();
  await ApiServer.Stop();
}
