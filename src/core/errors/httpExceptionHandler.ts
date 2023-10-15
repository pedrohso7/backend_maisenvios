import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ErrorResponse } from '../response/default_response';
import { HttpExceptionMessages, statusCodeToMessageMap } from '../constants/exception_messages_constants';
import { Response } from 'express';

export const handleHttpException = (error: any, res: Response): ErrorResponse => {
  if(error instanceof HttpException){
    const status = error.getStatus();
    res.status(status).send({
      message: error.message,
      statusCode: status,
      error: statusCodeToMessageMap[status],
    } as ErrorResponse);
    return;
  }

  throw {
    message: error.message,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    error: HttpExceptionMessages.INTERNAL_SERVER_ERROR,
  } as ErrorResponse;
};
