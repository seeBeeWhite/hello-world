import { Controller, Get } from '@nestjs/common';

import { ErrorResponse } from './const';
import {
  ResponseBalance,
  ResponseError,
  ResponsePayout,
} from './one-payment/one-payment.interface';
import { OnePaymentService } from './one-payment/one-payment.service';
import { RequestDataDefaultService } from './services/request-data-default.service';

@Controller()
export class AppController {
  constructor(
    private onePaymentService: OnePaymentService,
    private requestDataDefaultService: RequestDataDefaultService,
  ) {}

  @Get('one-payment/payout')
  payout(): Promise<ResponsePayout | ErrorResponse | ResponseError> {
    const requestPayoutCard = this.requestDataDefaultService.requestPayoutCard;

    return this.onePaymentService.payout(requestPayoutCard);
  }

  @Get('one-payment/status')
  status(): Promise<ResponsePayout | ErrorResponse | ResponseError> {
    const requestPayoutCard = this.requestDataDefaultService.requestPayoutCard;

    return this.onePaymentService.status(requestPayoutCard);
  }

  @Get('one-payment/balance')
  balance(): Promise<ErrorResponse | ResponseError | ResponseBalance> {
    const requestBalance = this.requestDataDefaultService.requestBalance;

    return this.onePaymentService.balance(requestBalance);
  }
}
