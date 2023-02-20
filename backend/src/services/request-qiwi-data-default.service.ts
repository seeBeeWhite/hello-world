import { Injectable } from '@nestjs/common';

import {
  PayoutType,
  RequestBalance,
  RequestPayoutQiwi,
  RequestStatusQiwi,
} from '../one-payment/one-payment.interface';

@Injectable()
export class RequestQiwiDataDefaultService {
  requestPayoutQiwi: RequestPayoutQiwi = {
    account: '79251234567',
    amount: '50',
    description: 'Тестовый платеж',
    partner_id: '1234',
    payment_type: PayoutType.qiwi,
    project_id: '5678',
    sign: 'd724e1e6453a43397bb2aa6d6be9cc06',
    user_data: '1',
  };

  requestStatusQiwi: RequestStatusQiwi = {
    order_id: '5678',
    partner_id: '1234',
    sign: 'd724e1e6453a43397bb2aa6d6be9cc06',
    user_data: '1',
  };

  requestBalance: RequestBalance = {
    partner_id: '1234',
    sign: 'd724e1e6453a43397bb2aa6d6be9cc06',
  };
}
