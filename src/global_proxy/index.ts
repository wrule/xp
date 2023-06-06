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
function OpenProxy() {
  if (agent_code === 'mac') {
    mac.enable('127.0.0.1', ProxyPort, 'http');
    mac.enable('127.0.0.1', ProxyPort, 'https');
  } else if (agent_code === 'win') {
    win.enable('127.0.0.1', ProxyPort);
  }
}

export
function CloseProxy() {
  if (agent_code === 'mac') {
    mac.disable('http');
    mac.disable('https');
  } else if (agent_code === 'win') {
    win.disable();
  }
}

export default {
  status,
  enable,
  disable,
}
