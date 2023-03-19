import { NestFactory } from '@nestjs/core';
import { LafModule } from './laf.module';

async function bootstrap() {
  const app = await NestFactory.create(LafModule);
  await app.listen(3000);
}
bootstrap();
