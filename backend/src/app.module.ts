import { WinstonModule } from 'nest-winston';

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { OnePaymentService } from './one-payment/one-payment.service';
import { RequestDataDefaultService } from './services/request-data-default.service';

@Module({
  imports: [HttpModule, WinstonModule.forRoot({})],
  controllers: [AppController],
  providers: [OnePaymentService, RequestDataDefaultService],
})
export class AppModule {}
