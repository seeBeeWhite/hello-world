import { Controller, Get } from '@nestjs/common';

import { ErrorResponse } from './const';
import {
  ResponseBalance,
  ResponseError,
  ResponsePayout,
} from './one-payment/one-payment.interface';
import { OnePaymentService } from './one-payment/one-payment.service';
import { RequestQiwiDataDefaultService } from './services/request-qiwi-data-default.service';

@Controller()
export class AppController {
  constructor(
    private onePaymentService: OnePaymentService,
    private requestDataDefaultService: RequestQiwiDataDefaultService,
  ) {}

  @Get('one-payment/payout')
  payout(): Promise<ResponsePayout | ErrorResponse | ResponseError> {
    const requestPayoutQiwi = this.requestDataDefaultService.requestPayoutQiwi;

    return this.onePaymentService.payout(requestPayoutQiwi);
  }

  @Get('one-payment/status')
  status(): Promise<ResponsePayout | ErrorResponse | ResponseError> {
    const requestStatusQiwi = this.requestDataDefaultService.requestStatusQiwi;

    return this.onePaymentService.status(requestStatusQiwi);
  }

  @Get('one-payment/balance')
  balance(): Promise<ErrorResponse | ResponseError | ResponseBalance> {
    const requestBalanceQiwi = this.requestDataDefaultService.requestBalance;

    return this.onePaymentService.balance(requestBalanceQiwi);
  }
}
