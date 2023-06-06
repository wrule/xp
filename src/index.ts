import { Start, Stop } from './proxy_server';

function main() {
  Start();
  setTimeout(() => {
    Stop();
  }, 10000);
}

main();
