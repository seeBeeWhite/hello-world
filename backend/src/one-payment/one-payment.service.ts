import axios, { AxiosError } from 'axios';
import { createLogger, format, transports } from 'winston';

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { ErrorResponse } from '../const';
import { getMD5 } from '../hash';
import {
  RequestBalance,
  RequestPayoutQiwi,
  RequestStatusQiwi,
  ResponseBalance,
  ResponseError,
  ResponsePayout,
  ResponseStatus,
} from './one-payment.interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpBuildQuery = require('http-build-query');

/**
 * https://doc.1payment.com/card-payout
 */

@Injectable()
export class OnePaymentService {
  static readonly URL_API = 'https://api.1payment.com';
  static readonly END_POINT_PAYOUT = '/init_payout';
  static readonly END_POINT_STATUS = '/status_payout';
  static readonly END_POINT_BALANCE = '/get_balance';

  private apiKey = 'apiKey';

  private logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
      new transports.Console({
        level: 'info',
        format: format.combine(format.colorize(), format.simple()),
      }),
    ],
  });

  constructor(private readonly httpService: HttpService) {}

  public setSecret(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async payout(
    params: RequestPayoutQiwi,
  ): Promise<ResponsePayout | ErrorResponse | ResponseError> {
    try {
      const response = await this.httpService
        .post(
          OnePaymentService.URL_API + OnePaymentService.END_POINT_PAYOUT,
          this.addSignature(params, OnePaymentService.END_POINT_PAYOUT),
        )
        .toPromise();

      const { request, ...other } = response;
      this.logger.http('Response', {
        context: 'OnePaymentService:payout',
        data: other,
      });
      return response.data;
    } catch (e) {
      return this.exceptionProcessor(e, this.payout.name);
    }
  }

  public async status(
    params: RequestStatusQiwi,
  ): Promise<ResponseStatus | ErrorResponse | ResponseError> {
    try {
      const response = await this.httpService
        .post(
          OnePaymentService.URL_API + OnePaymentService.END_POINT_STATUS,
          this.addSignature(params, OnePaymentService.END_POINT_STATUS),
        )
        .toPromise();

      const { request, ...other } = response;
      this.logger.http('Response', {
        context: 'OnePaymentService:status',
        data: other,
      });
      return response.data;
    } catch (e) {
      return this.exceptionProcessor(e, this.status.name);
    }
  }

  public async balance(
    params: RequestBalance,
  ): Promise<ResponseBalance | ErrorResponse | ResponseError> {
    try {
      const response = await this.httpService
        .post(
          OnePaymentService.URL_API + OnePaymentService.END_POINT_BALANCE,
          this.addSignature(params, OnePaymentService.END_POINT_BALANCE),
        )
        .toPromise();

      const { request, ...other } = response;
      this.logger.http('Response', {
        context: 'OnePaymentService:balance',
        data: other,
      });
      return response.data;
    } catch (e) {
      return this.exceptionProcessor(e, this.balance.name);
    }
  }

  private addSignature<T extends { sign: string }>(
    body: T,
    endPoint: string,
  ): T {
    delete body.sign;

    const ordered = Object.keys(body)
      .sort()
      .reduce((obj, key) => {
        obj[key] = body[key];
        return obj;
      }, {});

    const str =
      endPoint.replace('/', '') + httpBuildQuery(ordered) + this.apiKey;
    body.sign = getMD5(str);
    return body;
  }

  private exceptionProcessor(e, funcName): ErrorResponse {
    const name = `${this.constructor.name}:${funcName}`;
    const err = {
      name: e.name,
      message: e.message,
      stack: e.stack,
    };
    if (axios.isAxiosError(e)) {
      if (!!(<AxiosError>e).response) {
        const { request, ...other } = (<AxiosError>e).response;
        this.logger.http('Response', { context: name, data: other, err: err });
        switch ((<AxiosError>e).response.status) {
          case 400:
          case 405:
          case 403:
          case 422:
          case 500:
          default:
            return <ErrorResponse>e.response.data;
        }
      } else {
        this.logger.error('AxiosError', { context: name, err: err });
      }
    } else {
      this.logger.error('UndefinedError', { context: name, err: err });
    }
  }
}
