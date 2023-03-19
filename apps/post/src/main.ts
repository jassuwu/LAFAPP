import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PostModule } from './post.module';

async function bootstrap() {
  const app = await NestFactory.create(PostModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('POST_PORT'));
}
bootstrap();
