import { Start, Stop } from './proxy_server';
import * as ApiServer from './api_server';

function main() {
  ApiServer.Start();
  Start();
  // setTimeout(() => {
  //   Stop();
  // }, 10000);
}

main();
