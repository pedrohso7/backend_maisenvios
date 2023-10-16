import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { PublisherService } from 'src/core/utils/publisher_client';

@Module({
  controllers: [TagsController],
  providers: [
    TagsService,
    PublisherService,
  ],
})
export class TagsModule {}
