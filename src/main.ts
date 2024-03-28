import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe, patchNestJsSwagger } from 'nestjs-zod';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { HttpStatus } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix("api");

  const { httpAdapter } = app.get(HttpAdapterHost);

  patchNestJsSwagger()

  const config = new DocumentBuilder()
    .setTitle('Todo example')
    .setDescription('The Todo API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter, {
    // Prisma Error Code: HTTP Status Response
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
    P2003: HttpStatus.BAD_REQUEST,
    P2023: HttpStatus.BAD_REQUEST,
    P2010: HttpStatus.BAD_REQUEST,
  }));

  await app.listen(process.env.PORT ?? 8000, () => {
    console.log(`App Started on http://localhost:${process.env.PORT}`)
  });
}
bootstrap();
