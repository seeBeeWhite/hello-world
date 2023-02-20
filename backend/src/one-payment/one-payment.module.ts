import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { OnePaymentService } from './one-payment.service';

@Module({
  imports: [HttpModule],
  providers: [OnePaymentService],
  exports: [OnePaymentService],
})
export class OnePaymentModule {}
