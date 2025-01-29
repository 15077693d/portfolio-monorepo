import { Module } from '@nestjs/common';
import { VisitorCommentService } from './visitor-comment.service';
import { VisitorCommentController } from './visitor-comment.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [VisitorCommentController],
  providers: [VisitorCommentService],
  imports: [DrizzleModule],
})
export class VisitorCommentModule {}
