import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from '../response/default_response';
import { HttpExceptionMessages, NestPipeExceptions } from '../constants/exception_messages_constants';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const error = this.getErrorMessage(status);
    const message = status != HttpStatus.BAD_REQUEST ? error : exception.message;

    const errorResponse: ErrorResponse = {
      statusCode: status,
      message:  message || HttpExceptionMessages.INTERNAL_SERVER_ERROR,
      error: error || HttpExceptionMessages.INTERNAL_SERVER_ERROR,
    };

    response.status(status).json(errorResponse);
  }

  private getErrorMessage(status: number): String {
    switch(status){
      case HttpStatus.NOT_FOUND: return HttpExceptionMessages.NOT_FOUND;
      case HttpStatus.BAD_REQUEST: return HttpExceptionMessages.BAD_REQUEST;
    }
  }
}