import { Inject, Injectable } from '@nestjs/common';
import { DrizzleDB, visitorComments } from 'database';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { CreateVisitorCommentDto } from './dto';

@Injectable()
export class VisitorCommentService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  create(createVisitorCommentDto: CreateVisitorCommentDto) {
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
