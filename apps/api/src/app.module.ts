import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { VisitorCommentModule } from './visitor-comment/visitor-comment.module';

@Module({
  imports: [
    DrizzleModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VisitorCommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
