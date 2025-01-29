import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { VisitorCommentController } from './visitor-comment.controller';
import { VisitorCommentService } from './visitor-comment.service';

@Module({
  controllers: [VisitorCommentController],
  providers: [VisitorCommentService],
  imports: [DrizzleModule],
})
export class VisitorCommentModule {}
