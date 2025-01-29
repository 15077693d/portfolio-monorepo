import { Module } from '@nestjs/common';
import { db } from 'database';
export const DRIZZLE = Symbol('drizzle-connection');
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [],
      useFactory: () => {
        return db;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
