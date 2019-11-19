import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TagProvider } from './tag.model';

@Module({
  imports: [],
  controllers: [TagController],
  providers: [TagProvider, TagService],
  exports: [TagService],
})
export class TagModule {}
