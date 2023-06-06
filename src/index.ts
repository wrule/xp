import { CloseProxy, OpenProxy } from './global_proxy';

async function main() {
  console.log(1234);
  const a = await CloseProxy();
  console.log(a);
}

main();
