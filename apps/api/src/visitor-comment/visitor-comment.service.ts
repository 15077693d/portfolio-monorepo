import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { CreateVisitorComment, visitorComments } from 'src/drizzle/schema';
import { DrizzleDB } from 'src/drizzle/types/drizzle';

@Injectable()
export class VisitorCommentService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}
  create(createVisitorCommentDto: CreateVisitorComment) {
    return this.db.insert(visitorComments).values(createVisitorCommentDto);
  }

  findAll() {
    return this.db.query.visitorComments.findMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} visitorComment`;
  // }

  // update(id: number, updateVisitorCommentDto: UpdateVisitorCommentDto) {
  //   return `This action updates a #${id} visitorComment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} visitorComment`;
  // }
}
