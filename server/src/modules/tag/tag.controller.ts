import { Controller, Get, Post, Delete } from '@nestjs/common';
// import { TagService } from './tag.service';
// import { Tag } from './tag.model';

@Controller('tag')
export class TagController {
  // constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(): string {
    return 'test';
  }

  // @Get()
  // findAll(): Promise<Tag> {
  //   return this.tagService.findAll({});
  // }

  // @Post()
  // create(): Promise<Tag> {

  // }

  // @Delete()
  // delete(): Promise<Tag> {

  // }
}
