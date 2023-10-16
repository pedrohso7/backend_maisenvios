import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; 
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: 'spreadsheet_exchange',
          type: 'topic',
        },
      ],
      uri: 'amqp://rabbitmq:5672',
    }),
  );
  await app.listen(3000);
}
bootstrap();
