import * as ProxyServer from './proxy_server';
import * as ApiServer from './api_server';

export
function Start() {
  ProxyServer.Start();
  ApiServer.Start();
}

Start();
