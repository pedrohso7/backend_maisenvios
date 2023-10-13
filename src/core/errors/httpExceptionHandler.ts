import { HttpStatus } from '@nestjs/common';
import { ErrorResponse } from '../response/default_response';
import { HttpExceptionMessages } from '../constants/exception_messages_constants';

export const handleHttpException = (error: any): ErrorResponse => {
  if(error instanceof String){
    return {
      message: error,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: HttpExceptionMessages.INTERNAL_SERVER_ERROR,
    } as ErrorResponse;
  }

  return {
    message: error.message,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    error: HttpExceptionMessages.INTERNAL_SERVER_ERROR,
  } as ErrorResponse;
};
