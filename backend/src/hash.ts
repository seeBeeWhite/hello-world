import { createHash, createHmac } from 'crypto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const md5 = require('md5');

export function getSHA256Hex(data: string | Buffer): string {
  return createHash('sha256').update(data).digest('hex');
}

export function getHMAC512Base64(
  data: string | Buffer,
  secret: string,
): string {
  return createHmac('sha512', secret).update(data).digest('base64');
}

export function getHMAC256Hex(data: string | Buffer, secret: string): string {
  return createHmac('sha256', secret).update(data).digest('hex');
}

export function getHMAC256HexBase64(
  data: string | Buffer,
  secret: string,
): string {
  const hex = createHmac('sha256', secret).update(data).digest('hex');
  return Buffer.from(hex).toString('base64');
}

export function getSHA1Hex(data: string | Buffer): string {
  return createHash('sha1').update(data).digest('hex');
}

export function getMD5(data: string | Buffer): string {
  return md5(data).toString();
}
