import { Injectable, Post } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PublisherService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'spreadsheet_exchange',
        queueOptions: {
          durable: false
        },
      },
    });
  }

  @Post()
  async sendFileToConsumer(data: Express.Multer.File, callbackAction: (data: any) => void) {
    const extractedData = await lastValueFrom(this.client.send('process_data', data.buffer.toString('base64')));  
    callbackAction(extractedData);
  }
}