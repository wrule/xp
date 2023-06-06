import * as mac from './mac'
import * as win from './win'

export type ProxyType = 'http' | 'https'

const agent = /^win/.test(process.platform) ? win : mac

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
  enable('127.0.0.1', ProxyPort, 'http');
  enable('127.0.0.1', ProxyPort, 'https');
}

export
function CloseProxy() {
  disable();
}

export default {
  status,
  enable,
  disable,
}
