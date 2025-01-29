import { ApiProperty } from '@nestjs/swagger';
import { CreateVisitorComment, VisitorComment } from 'database';

export class CreateVisitorCommentDto implements CreateVisitorComment {
  @ApiProperty({
    description: 'Name of the commenter',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Content of the comment',
    example: 'Great website!',
  })
  content: string;
}

export class ResponseVisitorComment implements VisitorComment {
  @ApiProperty({
    example: 'Great website!',
  })
  content: string;

  @ApiProperty({
    example: 1699564800,
  })
  timestamp: number;

  @ApiProperty({
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
}
