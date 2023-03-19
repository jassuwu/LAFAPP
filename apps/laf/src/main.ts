import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { LafModule } from './laf.module';

async function bootstrap() {
  const app = await NestFactory.create(LafModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('LAF_PORT'));
}
bootstrap();
