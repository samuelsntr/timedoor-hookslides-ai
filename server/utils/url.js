import dns from 'node:dns/promises';
import net from 'node:net';

function privateIp(address) {
  if (net.isIPv4(address)) return address === '127.0.0.1' || address.startsWith('10.') || address.startsWith('192.168.') || /^172\.(1[6-9]|2\d|3[01])\./.test(address) || address.startsWith('169.254.');
  return address === '::1' || address.startsWith('fc') || address.startsWith('fd') || address.startsWith('fe80:');
}

export async function isAllowedRemoteUrl(value) {
  let url;
  try { url = new URL(value); } catch { return false; }
  if (!['http:', 'https:'].includes(url.protocol) || ['localhost', '127.0.0.1', '::1'].includes(url.hostname)) return false;
  try { return !(await dns.lookup(url.hostname, { all: true })).some(({ address }) => privateIp(address)); } catch { return false; }
}
