import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateVisitorCommentDto, ResponseVisitorComment } from './dto';
import { VisitorCommentService } from './visitor-comment.service';
@ApiTags('Visitor Comments')
@Controller('visitor-comment')
export class VisitorCommentController {
  constructor(private readonly visitorCommentService: VisitorCommentService) {}

  @Post()
  @ApiOperation({
    summary: 'Create visitor comment',
    description:
      'Creates a new visitor comment with the provided name and content',
  })
  @ApiBody({
    type: CreateVisitorCommentDto,
    description: 'Comment data to create',
  })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Comment created successfully',
  //   type: ResponseVisitorCommentDto,
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Bad request - invalid data provided',
  // })
  create(@Body() createVisitorCommentDto: CreateVisitorCommentDto) {
    return this.visitorCommentService.create(createVisitorCommentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all comments',
    description: 'Retrieves all visitor comments',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all visitor comments',
    type: [ResponseVisitorComment],
  })
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
