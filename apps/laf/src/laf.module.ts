import { Module } from '@nestjs/common';
import { LafController } from './laf.controller';
import { LafService } from './laf.service';

@Module({
  imports: [],
  controllers: [LafController],
  providers: [LafService],
})
export class LafModule {}
