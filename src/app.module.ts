import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagsModule } from './resources/tags/tags.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CustomValidationPipe } from './core/pipes/custom_validation_pipe';
import { HttpExceptionFilter } from './core/filters/http_exception_global_filter';

@Module({
  imports: [TagsModule],
  controllers: [AppController],
  providers: [
    AppService, 
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
