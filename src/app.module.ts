import { Module } from '@nestjs/common';

import { TaskModule } from './task/task.module';
import { PrismaModule } from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ZodSerializerInterceptor } from 'nestjs-zod';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    TaskModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    }
  ]
})
export class AppModule { }
