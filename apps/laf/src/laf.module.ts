import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LafController } from './laf.controller';
import { LafService } from './laf.service';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '../../../.env',
      }
    )
  ],
  controllers: [LafController],
  providers: [LafService],
})
export class LafModule { }
