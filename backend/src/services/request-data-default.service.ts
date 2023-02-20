import { Injectable } from '@nestjs/common';

import {
  PayoutType,
  RequestBalance,
  RequestPayoutCard,
} from '../one-payment/one-payment.interface';

@Injectable()
export class RequestDataDefaultService {
  requestPayoutCard: RequestPayoutCard = {
    payout_type: PayoutType.qiwi,
    partner_id: '1234',
    project_id: '5678',
    amount: '50',
    destination: '1234567890101112',
    user_data: '1',
    sign: 'd724e1e6453a43397bb2aa6d6be9cc06',
    first_name: 'First',
    last_name: 'Last',
    year: '24',
    month: '12',
  };

  requestBalance: RequestBalance = {
    partner_id: '1234',
    sign: 'd724e1e6453a43397bb2aa6d6be9cc06',
  };
}
