import { Logger } from '@nestjs/common';
import { z } from 'zod';
import { createEnv } from './utils/env';

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(["development", "test", "production"]),
        PORT: z.string().min(1, 'This env variable is required'),
        DATABASE_URL: z.string().min(1),
        TELEGRAM_BOT_TOKEN: z.string().min(1, 'This env variable is required'),
    },

    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL,
        PORT: process.env.PORT,
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    }
})

const logger = new Logger('env');

logger.verbose(JSON.stringify(env, null, 2));