import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateVisitorComment } from 'src/drizzle/schema';
import { VisitorCommentService } from './visitor-comment.service';

@Controller('visitor-comment')
export class VisitorCommentController {
  constructor(private readonly visitorCommentService: VisitorCommentService) {}

  @Post()
  create(@Body() createVisitorCommentDto: CreateVisitorComment) {
    return this.visitorCommentService.create(createVisitorCommentDto);
  }

  @Get()
  findAll() {
    return this.visitorCommentService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.visitorCommentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateVisitorCommentDto: CreateVisitorComment,
  // ) {
  //   return this.visitorCommentService.update(+id, updateVisitorCommentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.visitorCommentService.remove(+id);
  // }
}
