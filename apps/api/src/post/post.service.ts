import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { posts } from 'src/drizzle/schema';

@Injectable()
export class PostService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAll() {
    return await this.db.select().from(posts);
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
