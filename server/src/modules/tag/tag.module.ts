import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [],
  controllers: [TagController],
  providers: [TagService],
  exports: [],
})
export class TagModule {}
