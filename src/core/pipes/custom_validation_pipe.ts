import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { NestPipeExceptions } from '../constants/exception_messages_constants';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const errorMessages = this.buildErrorMessages(errors);
      throw new BadRequestException({
        message: errorMessages[0],
        statusCode: HttpStatus.BAD_REQUEST,
        error: NestPipeExceptions.BAD_REQUEST,
      }); 
    }
    
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private buildErrorMessages(errors: ValidationError[]): string[] {
    const errorMessages: string[] = [];
    for (const error of errors) {
      for (const constraint in error.constraints) {
        const variableName = error.constraints[constraint].split(' ')[0];
        if (error.constraints.hasOwnProperty(constraint)) {
            switch (constraint) {
                case 'isNotEmpty':
                    errorMessages.push(`Campo ${variableName} campo não pode estar vazio.`);
                    break;
                case 'isString':
                    errorMessages.push(`Campo ${variableName} deve ser uma string.`);
                    break;
                case 'isNumber':
                    errorMessages.push(`Campo ${variableName} deve ser um número válido.`);
                    break;
                default:
                    errorMessages.push(error.constraints[constraint]);
                    break;
            }
        }
      }
    }
    return errorMessages;
  }
}