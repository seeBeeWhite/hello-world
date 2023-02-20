import { CurrencyType } from '../const';

export enum PayoutType {
  mobile = 'mc',
  card = 'card',
  yandex = 'yandex',
  qiwi = 'qiwi',
  webmoney = 'wm',
}

export enum ErrorCode {
  GENERAL = 1, // Общая ошибка: обратитесь в поддержку для уточнения
  SIGN = 2, // Ошибка проверки цифровой подписи
  METHOD = 3, // Метод недоступен
  PARTNER = 4, // Ошибка определения партнера
  PROJECT = 5, // Ошибка определения проекта
  PAY_METHOD = 6, // Платежный метод для данного проекта недоступен
  PAYOUT = 7, // Данный способ выплат недоступен для проекта
  USER_DATA = 8, // Некорректный параметр user_data
  BALANCE = 9, // Недостаточно средств на балансе для проведения выплаты
  NOT_FOUND = 10, // Транзакция не найдена
  SOURCE = 11, // Оплата для данного источника недоступна
}

export enum PayoutStatus {
  PENDING = 2,
  SUCCESS = 3,
  FAILURE = 4,
}

export type RequestPayout = {
  payout_type: PayoutType;
  partner_id: string;
  project_id: string;
  amount: string;
  destination: string;
  user_data: string;
  sign: string;
};

export type RequestPayoutQiwi = {
  account: string;
  amount: string;
  description?: string;
  ip?: string;
  partner_id: string;
  payment_type: PayoutType;
  project_id: string;
  shop_url?: string;
  sign: string;
  user_data: string;
};

export type RequestStatusQiwi = {
  partner_id: string;
  order_id: string;
  user_data: string;
  sign: string;
};

export type RequestPayoutCard = RequestPayout & {
  first_name?: string;
  last_name?: string;
  year?: string;
  month?: string;
};

export type RequestStatus = Pick<RequestPayout, 'partner_id' | 'sign'> &
  Partial<ResponsePayout> &
  Partial<Pick<RequestPayout, 'user_data'>>;

export type RequestBalance = Pick<RequestPayout, 'partner_id' | 'sign'>;

export type ResponseError = {
  error_code: ErrorCode;
};

export type ResponsePayout = {
  order_id: string;
};

export type NotifyPayoutCard = ResponsePayout & {
  payout_type: PayoutType;
  project_id: string;
  status: PayoutStatus;
  status_description: keyof typeof PayoutStatus;
  init_time: string;
  status_time: string;
  amount: string;
  balance_amount: string;
  destination: string;
  status_code: string;
  paid_amount?: string;
  init_amount?: string;
};

export type ResponseStatus = NotifyPayoutCard & {
  currency: string;
};

export type ResponseBalance = Pick<
  ResponseStatus,
  'project_id' | 'currency'
> & {
  project_balance: ProjectBalance[];
};

export type ProjectBalance = {
  project_id: number;
  currency: CurrencyType;
  payout_balance: number;
  hold: number;
};
