import { Body, Controller, Post } from '@nestjs/common';

import { ErrorResponse } from './const';
import {
  ResponseBalance,
  ResponseError,
  ResponsePayout,
} from './one-payment/one-payment.interface';
import { OnePaymentService } from './one-payment/one-payment.service';

@Controller()
export class AppController {
  constructor(private onePaymentService: OnePaymentService) {}

  @Post('one-payment/payout')
  payout(
    @Body() body: any,
  ): Promise<ResponsePayout | ErrorResponse | ResponseError> {
    return this.onePaymentService.payout(body);
  }

  @Post('one-payment/status')
  status(
    @Body() body: any,
  ): Promise<ResponsePayout | ErrorResponse | ResponseError> {
    return this.onePaymentService.status(body);
  }

  @Post('one-payment/balance')
  balance(
    @Body() body: any,
  ): Promise<ErrorResponse | ResponseError | ResponseBalance> {
    return this.onePaymentService.balance(body);
  }
}
