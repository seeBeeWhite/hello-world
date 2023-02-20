// export const CURRENCY_CODES = {
//     USD: 840,
//     UAH: 980,
//     EUR: 978,
//     RUB: 643,
// } as const;
// export const CURRENCY = Object.keys(CURRENCY_CODES);
// export type CurrencyType = typeof CURRENCY[number];

import { ValueTransformer } from 'typeorm';

export const COUNTRY_CODES = {
  RU: 643,
  USA: 840,
  DE: 276,
  CN: 156,
} as const;
export const COUNTRIES = Object.keys(COUNTRY_CODES);
export type CountryType = (typeof COUNTRIES)[number];

export const whiteList = [
  '::ffff:46.101.47.246',
  '::ffff:46.101.55.178',
  '::ffff:89.111.51.9',

  '::ffff:127.0.0.1',
  '::1:127.0.0.0',

  '::ffff:80.77.174.226',
  '::ffff:80.77.174.227',
  '::ffff:80.77.174.228',
  '::ffff:80.77.174.229',
  '::ffff:80.77.174.230',
  '::ffff:80.77.174.2',
  '::ffff:80.77.174.3',
  '::ffff:80.77.174.4',
  '::ffff:80.77.174.5',
  '::ffff:80.77.174.6',
  '::ffff:52.28.140.226',
  '::ffff:52.58.178.131',
  '::ffff:18.157.147.106',
  '::ffff:3.124.169.240',
  '::ffff:3.127.187.224',
  '::ffff:18.193.174.187',
];

export enum CurrencyType {
  RUB = 'RUB',
  USD = 'USD',
  EUR = 'EUR',
  KZT = 'KZT',
  USDT = 'USDT',
}

export enum StatusVqType {
  INIT = 'INIT',
  HOLD = 'HOLD',
  FINISH = 'FINISH',
  ERROR = 'ERROR',
  CANCEL = 'CANCEL',
  unknown = 'unknown',
}

export enum StatusType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type ErrorResponse = {
  status: StatusType;
  code?: string;
  message?: string;
};

export class ColumnNumericTransformer implements ValueTransformer {
  to(data: number): number {
    return data;
  }

  from(data: number): number {
    return Number(data);
  }
}

export enum GatewayName {
  OST = 'OST',
  C2C = 'C2C',
  UAP = 'UAP',
  SWP = 'SWP',
  '1PAY' = '1PAY',
  MBET = 'MBET',
}

export enum ClientType {
  user = 'user',
  provider = 'provider',
}

export enum UserPermissions {
  useWeb = 'useWeb',
  useApi = 'useApi',
}

export enum ProviderPermissions {
  sudo = 'sudo',
  admin = 'admin',
  useWeb = 'useWeb',
}
