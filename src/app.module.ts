import { Module } from '@nestjs/common';

import { TaskModule } from './task/task.module';
import { PrismaModule } from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './bot/bot.module';
import { env } from './env';
import { BOT_NAME } from './bot/bot.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    TelegrafModule.forRoot({
      token: env.TELEGRAM_BOT_TOKEN,
      botName: BOT_NAME,
      include: [BotModule]
    }),
    UserModule,
    TaskModule,
    BotModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    }
  ]
})
export class AppModule { }
