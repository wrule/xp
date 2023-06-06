import * as mac from './mac'
import * as win from './win'

export type ProxyType = 'http' | 'https'

const agent = /^win/.test(process.platform) ? win : mac
const agent_code = /^win/.test(process.platform) ? 'win' : 'mac'

function execute(fn: string, ...args: any[]) {
  return new Promise((resolve, reject) => {
    const ret = ((agent as any)[fn] as Function)(...args)
    if (ret.status) {
      reject(ret.stdout)
    } else {
      resolve(ret.stdout)
    }
  })
}

export function enable(hostname: string, port: number, protocol?: ProxyType) {
  return execute('enable', hostname, port, protocol)
}

export function disable() {
  return execute('disable')
}

export function status() {
  return execute('status')
}

export const ProxyPort = 38503;

export
async function OpenProxy() {
  let result = null;
  if (agent_code === 'mac') {
    result = await Promise.all([
      mac.enable('127.0.0.1', ProxyPort, 'http'),
      mac.enable('127.0.0.1', ProxyPort, 'https'),
    ]);
  } else if (agent_code === 'win') {
    result = await win.enable('127.0.0.1', ProxyPort);
  }
  console.log('global_proxy already registered');
  return result;
}

export
async function CloseProxy() {
  let result = null;
  if (agent_code === 'mac') {
    result = await Promise.all([
      mac.disable('http'),
      mac.disable('https'),
    ]);
  } else if (agent_code === 'win') {
    result = await win.disable();
  }
  console.log('global_proxy already uninstalled');
  return result;
}

export default {
  status,
  enable,
  disable,
}
