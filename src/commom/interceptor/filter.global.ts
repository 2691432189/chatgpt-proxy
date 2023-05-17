import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';

interface resData {
  message: string | string[];
}

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const resData = exception.getResponse() as resData;

    response.status(status).json({
      data: resData.message,
      time: new Date(),
      success: false,
      path: request.url,
      status,
    });
  }
}
