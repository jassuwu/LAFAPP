import { Controller, Get } from '@nestjs/common';
import { LafService } from './laf.service';

@Controller()
export class LafController {
  constructor(private readonly lafService: LafService) {}

  @Get()
  getHello(): string {
    return this.lafService.getHello();
  }
}
